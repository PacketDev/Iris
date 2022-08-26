using System.Net.Sockets;
using System.Net;
using Server.Net.IO;

namespace Server
{
    class Program
    {
        static List<Client> users;
        static TcpListener _listener;

        static void Main(string[] args)
        {
            Console.Title = "Iris Server";
            users = new List<Client>();
            _listener = new TcpListener(IPAddress.Parse("127.0.0.1"), 7777);
            _listener.Start();

            while (true)
            {
                var client = new Client(_listener.AcceptTcpClient());
                users.Add(client);

                StreamConnection();
            }
        }

        static void StreamConnection()
        {
            foreach (var user in users)
            {
                foreach (var usr in users)
                {
                    var streamPacket = new PacketBuilder();
                    streamPacket.WriteOpCode(1);
                    streamPacket.WriteString(usr.displayName);
                    streamPacket.WriteString(usr.UUID.ToString());
                    user.Socket.Client.Send(streamPacket.GetPacketBytes());
                }
            }
        }

        public static void StreamMessage(string message)
        {
            foreach (var user in users)
            {
                var messagePacket = new PacketBuilder();
                messagePacket.WriteOpCode(5);
                messagePacket.WriteString(message);
                user.Socket.Client.Send(messagePacket.GetPacketBytes());
            }
        }

        public static void StreamDisconnect(string uuid)
        {
            var disconnectedUser = users.Where(x => x.UUID.ToString() == uuid).FirstOrDefault();
            users.Remove(disconnectedUser);
            foreach (var user in users)
            {
                var streamPacket = new PacketBuilder();
                streamPacket.WriteOpCode(10);
                streamPacket.WriteString(uuid);
                user.Socket.Client.Send(streamPacket.GetPacketBytes());
            }

            StreamMessage($"[{disconnectedUser.displayName}]: Disconnected.");
        }
    }
}