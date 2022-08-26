using Server.Net.IO;
using System.Net.Sockets;
using Server.Utils;

namespace Server
{
    public class Client
    {
        public string displayName { get; set; }
        public Guid UUID { get; set; }
        public TcpClient Socket { get; set; }
        PacketReader _packet;

        public Client(TcpClient client)
        {
            Socket = client;
            UUID = Guid.NewGuid();
            _packet = new PacketReader(Socket.GetStream());

            var opcode = _packet.Read();
            displayName = _packet.ReadMessage();

            IrisLogger.InitilizeInfo($"[{DateTime.Now}]: Client Connected: {displayName}", "Client");

            Task.Run(() => Process());
        }

        void Process()
        {
            while (true)
            {
                try
                {
                    var opcode = _packet.ReadByte();
                    switch (opcode)
                    {

                        case 1:
                            var message = _packet.ReadMessage();
                            IrisLogger.InitilizeProccess($"Message Received: {message}", "Client");
                            Program.StreamMessage($"[{DateTime.Now}]: [{displayName}] {message}");
                            break;

                        default:
                            break;
                    }
                } 
                catch (Exception)
                {
                    IrisLogger.InitilizeError($"{UUID.ToString()} Disconnected.", "Client");
                    Program.StreamDisconnect(UUID.ToString());
                    Socket.Close();
                    break;
                }
            }
        }
    }
}
