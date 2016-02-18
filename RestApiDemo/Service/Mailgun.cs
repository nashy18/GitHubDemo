using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RestSharp;
using RestSharp.Authenticators;

namespace RestApiDemo.Service
{
    public class Mailgun
    {
        public static dynamic SendSimpleMessage(string Email)
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
            request.AddParameter("to", "Avinash Kumar <"+Email+">");
            request.AddParameter("subject", "Welcome to TechQ");
            request.AddParameter("text", "Congratulations, You have successfully registered with TechQ. Kindly Login in to the application.");
            request.Method = Method.POST;
            var execute = client.Execute(request);
            return execute;
        }
    
    }
}