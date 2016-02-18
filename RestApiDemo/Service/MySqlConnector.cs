using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Dynamic;
using MySql.Data.MySqlClient;

namespace RestApiDemo.Service
{
    public class MySqlConnector
    {
        public string connectionString = ConfigurationManager.ConnectionStrings["testDB"].ConnectionString;        

        private dynamic Connection(string ConnectionStatus)
        {
            dynamic response = new ExpandoObject();
            try
            {
                MySqlConnection mySqlConnnection = new MySqlConnection(connectionString);
                if (ConnectionStatus == "Open")
                {
                    mySqlConnnection.Open();
                    response.mySqlConnection = mySqlConnnection;
                    response.connectionStatusOpened = true;
                }
                else
                {
                    mySqlConnnection.Close();                    
                    response.connectionStatusClosed = true;
                }
            }
            catch (Exception ex)
            {
                response.connectionStatusOpened = false;
            }
            return response;
        }

        public dynamic Read(string Table)
        {
            dynamic response = new ExpandoObject();
            try
            {                
                MySqlDataReader rdr = null;
                var myConnection = Connection("Open");
                if (myConnection.connectionStatusOpened)
                {
                    string query = "SELECT * FROM "+Table;
                    MySqlCommand cmd = new MySqlCommand(query, myConnection.mySqlConnection);
                    rdr = cmd.ExecuteReader();
                    DataTable demoResult = new DataTable("table");
                    //Load DataReader into the DataTable.
                    demoResult.Load(rdr);
                    rdr.Close();
                    Connection("Close");
                    response.TableName = Table;
                    response.Result = demoResult;
                    response.Success = true;

                }
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            return response;
        }

        public dynamic Insert(dynamic request)
        {
            dynamic response = new ExpandoObject();
            try
            {
                var myConnection = Connection("Open");
                if (myConnection.connectionStatusOpened)
                {
                    string query = "INSERT INTO user (FirstName,MiddleName,LastName,Address,DOB,Mobile,DateCreated,DateModified,Role,Status,Sex,Email,Password,UserName,CreatedBy) VALUES (@FirstName,@MiddleName,@LastName,@Address,@DOB,@Mobile,@DateCreated,@DateModified,@Role,@Status,@Sex,@Email,@Password,@UserName,@CreatedBy);";
                    MySqlCommand cmd = new MySqlCommand(query, myConnection.mySqlConnection);
                    cmd.Parameters.AddWithValue("@FirstName", request.FirstName.ToString());
                    cmd.Parameters.AddWithValue("@MiddleName", request.MiddleName.ToString());
                    cmd.Parameters.AddWithValue("@LastName", request.LastName.ToString());
                    cmd.Parameters.AddWithValue("@Address", request.Address.ToString());
                    cmd.Parameters.AddWithValue("@DOB", request.DOB);
                    cmd.Parameters.AddWithValue("@Mobile", request.Mobile.ToString());
                    cmd.Parameters.AddWithValue("@DateCreated", DateTime.Now);
                    cmd.Parameters.AddWithValue("@DateModified", DateTime.Now);
                    cmd.Parameters.AddWithValue("@Role", request.Role.ToString());
                    cmd.Parameters.AddWithValue("@Status", true);
                    cmd.Parameters.AddWithValue("@Sex", (char)request.Sex);
                    cmd.Parameters.AddWithValue("@Email", request.Email.ToString());
                    cmd.Parameters.AddWithValue("@Password", request.Password.ToString());
                    cmd.Parameters.AddWithValue("@UserName", request.UserName.ToString());
                    cmd.Parameters.AddWithValue("@CreatedBy", 0);                    
                    // Execute the query
                    response.Count = cmd.ExecuteNonQuery();
                    Connection("Close");
                    response.Success = true;
                }               
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            return response;
        }

        public dynamic Update()
        {
            dynamic response = new ExpandoObject();
            try
            {

                var myConnection = Connection("Open");
                if (myConnection.connectionStatusOpened)
                {
                    string query = "UPDATE demo SET mobile = @mobile WHERE Id = @Id";
                    MySqlCommand cmd = new MySqlCommand(query, myConnection.mySqlConnection);
                    cmd.Parameters.AddWithValue("@mobile", "9738378198");
                    cmd.Parameters.AddWithValue("@Id", "1");
                    // Execute the query
                    response.result = cmd.ExecuteNonQuery();
                    Connection("Close");
                    response.Success = true;
                }         
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            return response;
        }

        public dynamic Delete(int Id)
        {
            dynamic response = new ExpandoObject();
            try
            {

                var myConnection = Connection("Open");
                if (myConnection.connectionStatusOpened)
                {
                    string query = "DELETE FROM demo WHERE Id=@Id";
                    MySqlCommand cmd = new MySqlCommand(query, myConnection.mySqlConnection);                    
                    cmd.Parameters.AddWithValue("@Id", Id);
                    // Execute the query
                    response.result = cmd.ExecuteNonQuery();
                    Connection("Close");
                    response.Success = true;
                }
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            return response;
        }

        public dynamic Search(dynamic request)
        {
            dynamic response = new ExpandoObject();
            try
            {
                MySqlDataReader rdr = null;
                var myConnection = Connection("Open");
                if (myConnection.connectionStatusOpened)
                {
                    string query = String.Format("select * from {0} where Email = '{1}' and Password= '{2}'", request.TableName.ToString(), request.Email.ToString(), request.Password.ToString()); 
                    MySqlCommand cmd = new MySqlCommand(query, myConnection.mySqlConnection);
                    rdr = cmd.ExecuteReader();
                    DataTable demoResult = new DataTable("table");
                    //Load DataReader into the DataTable.
                    demoResult.Load(rdr);
                    rdr.Close();
                    Connection("Close");
                    response.Result = demoResult;
                    response.Success = true;

                }
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            return response;
        }
    }
}