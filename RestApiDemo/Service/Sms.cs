using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
using RestSharp.Authenticators;

namespace RestApiDemo.Service
{
    public class Sms
    {
        public static dynamic SendSimpleMessage()
        {
            RestClient client = new RestClient();
            var URL = "https://api.mailgun.net/v3";
            System.Uri uri = new System.Uri(URL);
            client.BaseUrl = uri;
            client.Authenticator =
                   new HttpBasicAuthenticator("api",
                                              "key-ed631b75ec3a7bdd072b9d42a6ec29aa");
            RestRequest request = new RestRequest();
            //IRestRequest request = new RestRequest();
            request.AddParameter("domain",
                                "sandboxe35d5b33c97946968312641957697114.mailgun.org", ParameterType.UrlSegment);
            request.Resource = "{domain}/messages";
            request.AddParameter("from", "Mailgun Sandbox <postmaster@sandboxe35d5b33c97946968312641957697114.mailgun.org>");
            request.AddParameter("to", "Avinash Kumar <nashy18@gmail.com>");
            request.AddParameter("subject", "Hello Avinash Kumar");
            request.AddParameter("text", "Congratulations Avinash Kumar, you just sent an email with Mailgun!  You are truly awesome!  You can see a record of this email in your logs: https://mailgun.com/cp/log .  You can send up to 300 emails/day from this sandbox server.  Next, you should add your own domain so you can send 10,000 emails/month for free.");
            request.Method = Method.POST;
            var execute = client.Execute(request);
            return execute;
        }
    
    }
}