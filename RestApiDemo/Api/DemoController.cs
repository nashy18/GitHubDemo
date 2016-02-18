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
    public class DemoController : ApiController
    {
        [HttpGet]
        [Route("api/read/{table}")]
        public dynamic Index(string table)
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                MySqlConnector sqlConnect = new MySqlConnector();
                response = sqlConnect.Read(table);                
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
        [Route("api/insert")]
        public dynamic Insert()
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                MySqlConnector sqlConnect = new MySqlConnector();
                response = sqlConnect.Insert();
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
        [Route("api/update")]
        public dynamic Update()
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                MySqlConnector sqlConnect = new MySqlConnector();
                response = sqlConnect.Update();
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

        [HttpDelete]
        [Route("api/delete/{id}")]
        public dynamic Delete(int id)
        {
            dynamic response = new ExpandoObject();
            dynamic JSONData = null;
            try
            {
                MySqlConnector sqlConnect = new MySqlConnector();
                response = sqlConnect.Delete(id);
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
    }
}
