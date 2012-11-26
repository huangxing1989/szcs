using System;
using System.Collections.Generic;
using System.Web;

namespace szcs.Model
{
    public class User
    {
        private string _id;
        private string _name;
        private string _password;
        private int _privilege;

        public User(string id,string name,string password,int privilege){
            this._id=id;
            this._name = name;
            this._password = password;
            this._privilege = privilege;
        }

        public string Id{

            get{
                return this._id;
            }
        }

        public string Name
        {
            get { 
            
                return this._name;
            
            }
        }

        public string Password
        {

            get {

                return this._password;
            }
        }

        public int Privilege
        {
            get
            {
                return this._privilege;

            }
        }
    }
}
