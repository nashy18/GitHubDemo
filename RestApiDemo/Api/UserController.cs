using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestApiDemo.Service;

namespace RestApiDemo.Controllers
{
    public class UserController : ApiController
    {
        MySqlConnector sqlConnect = new MySqlConnector();

        [HttpGet]
        [Route("api/user")]
        public dynamic GetAll()
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {               
                response = sqlConnect.Read("user");                
                JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                //_logger.Error("Exception Message: " + ex.Message + "& Stack Trace:" + ex.StackTrace);
            }
            //return JSONData;
            return response;
        }

        [HttpPost]
        [Route("api/user/insert")]
        public dynamic Insert(dynamic request)
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                var SaveUser = sqlConnect.Insert(request);
                if (SaveUser.Success && SaveUser.Count == 1)
                {
                    response = sqlConnect.Search(request);
                    response.mailResponse = Mailgun.SendSimpleMessage(request.Email.ToString());
                }
                JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
                //_logger.Error("Exception Message: " + ex.Message + "& Stack Trace:" + ex.StackTrace);
            }
            //return JSONData;
            return response;
        }

        [HttpGet]
        [Route("api/user/update")]
        public dynamic Update()
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                response = sqlConnect.Update();
                JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            //return JSONData;
            return response;
        }

        [HttpDelete]
        [Route("api/user/delete/{id}")]
        public dynamic Delete(int id)
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                response = sqlConnect.Delete(id);
                JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            //return JSONData;
            return response;
        }

        [HttpPost]
        [Route("api/user/search")]
        public dynamic Search(dynamic request)
        {
            dynamic response = new ExpandoObject();
            //dynamic JSONData = Newtonsoft.Json.JsonConvert.DeserializeObject(request);
            try
            {
                response = sqlConnect.Search(request);                
                //JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
            }
            catch (Exception ex)
            {
                response.Success = false;
            }
            //return JSONData;
            return response;
        }
    }
}
