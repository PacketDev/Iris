using Client.Utils;
using Client.Net.IO;
using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace Client.Net
{
    public class Server
    {
        public PacketReader PacketReader;

        public event Action connectEvent;
        public event Action messageReceivedEvent;
        public event Action userDisconnectedEvent;


        TcpClient _client;

        public Server()
        {
            _client = new TcpClient();
        }

        public void ConnectServer(string displayName)
        {
            if (!_client.Connected)
            {
                _client.Connect("127.0.0.1", 7777);
                PacketReader = new PacketReader(_client.GetStream());

                if (!string.IsNullOrEmpty(displayName))
                {
                    var connectPacket = new PacketBuilder();
                    connectPacket.WriteOpCode(0);
                    connectPacket.WriteString(displayName);
                    _client.Client.Send(connectPacket.GetPacketBytes());
                }

                ReadPackets();
            }
        }

        private void ReadPackets()
        {
            Task.Run(() =>
            {
                while (true)
                {
                    var opcode = PacketReader.ReadByte();

                    switch (opcode)
                    {
                        case 1:
                            connectEvent?.Invoke();
                            break;

                        case 5:
                            messageReceivedEvent?.Invoke();
                            break;

                        case 10:
                            userDisconnectedEvent?.Invoke();
                            break;

                        default:
                            IrisLogger.InitilizeInfo("ah", "Server");
                            break;
                    }
                }
            });
        }

        public void SendMessageToServer(string message)
        {
            var messagePacket = new PacketBuilder();
            messagePacket.WriteOpCode(5);
            messagePacket.WriteString(message);

            _client.Client.Send(messagePacket.GetPacketBytes());
        }
    }
}
