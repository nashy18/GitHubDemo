using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RestSharp;
using RestSharp.Authenticators;
using System.Web;

namespace RestApiDemo.Controllers
{
    public class NewsController : ApiController
    {
        [HttpGet]
        [Route("api/news")]
        public dynamic News()
        {
            dynamic response = new ExpandoObject();
            RestClient client = new RestClient();
            RestRequest request = new RestRequest();
            //dynamic JSONData = null;
            try
            {
                var url = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&q=" + HttpContext.Current.Request.QueryString["url"];                
                System.Uri uri = new System.Uri(url);
                client.BaseUrl = uri;
                request.Method = Method.GET;
                var result = client.Execute(request);
                response.News = Newtonsoft.Json.JsonConvert.DeserializeObject(result.Content);
                response.Success = true;
                //JSONData = Newtonsoft.Json.JsonConvert.SerializeObject(response);
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
