using Client.MVVM.Core;
using Client.MVVM.Model;
using Client.Net;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace Client.MVVM.ViewModel
{
    public class MainViewModel
    {
        public ObservableCollection<UserModel> Users { get; set; }
        public ObservableCollection<string> Messages { get; set; }
        public RelayCommand ConnectServerCommand { get; set; }
        public RelayCommand SendMessageCommand { get; set; }

        public string displayName { get; set; }
        public string Message { get; set; }

        private Server _server;

        public MainViewModel()
        {
            Users = new ObservableCollection<UserModel>();
            Messages = new ObservableCollection<string>();
            _server = new Server();
            _server.connectEvent += UserConnected;
            _server.messageReceivedEvent += MessageReceived;
            _server.userDisconnectedEvent += UserDisconnect;
            ConnectServerCommand = new RelayCommand(o => _server.ConnectServer(displayName), o => !string.IsNullOrEmpty(displayName));

            SendMessageCommand = new RelayCommand(o => _server.SendMessageToServer(Message), o => !string.IsNullOrEmpty(Message));
        }

        private void UserDisconnect()
        {
            var uuid = _server.PacketReader.ReadMessage();
            var user = Users.Where(x => x.UUID == uuid).FirstOrDefault();
            Application.Current.Dispatcher.Invoke(() => Users.Remove(user));
        }

        private void MessageReceived()
        {
            var message = _server.PacketReader.ReadMessage();
            Application.Current.Dispatcher.Invoke(() => Messages.Add(Message));
        }

        private void UserConnected()
        {
            var user = new UserModel
            {
                displayName = _server.PacketReader.ReadMessage(),
                UUID = displayName = _server.PacketReader.ReadMessage()
            };

            if (!Users.Any(x => x.UUID == user.UUID))
            {
                Application.Current.Dispatcher.Invoke(() => Users.Add(user));
            }
        }
    }
}
