using System;
using System.Linq;
using System.Text;

namespace PicarioXPO.RenderAPI.V2
{
    public class XpoV2UrlGenerator : IXpoUrlGenerator
    {
        public string GetUrl(XpoUrlRequest request)
        {
            if (request is XpoImageUrlRequest)
                return GetUrl(request as XpoImageUrlRequest);

            if (request is XpoCoordinatesUrlRequest)
                return GetUrl(request as XpoCoordinatesUrlRequest);

            throw new NotSupportedException("Input type is not recognized");
        }

        public string GetUrl(XpoImageUrlRequest request)
        {
            var baseUri = GetXpoBaseUrl(request);

            var stringBuilder = new StringBuilder(baseUri);
            stringBuilder
                .Append(request.PrimaryKey)
                .AppendRequest(request)
                .AppendColors(request.Objects.Where(x => x.Color != null))
                .AppendDesigns(request.Objects.Where(x => x.Design != null));

            
            return stringBuilder.ToString();
        }

        private string GetXpoBaseUrl(XpoUrlRequest urlRequest)
        {
            if (urlRequest != null && !string.IsNullOrEmpty(urlRequest.AbsoluteUrl))
            {
                return urlRequest.AbsoluteUrl.EndsWith("/") ? urlRequest.AbsoluteUrl : urlRequest.AbsoluteUrl + "/";
            }

            return "/";
        }

        public string GetUrl(XpoCoordinatesUrlRequest request)
        {
            var baseUri = GetXpoBaseUrl(request);

            var stringBuilder = new StringBuilder(baseUri);
            stringBuilder
                .Append(request.PrimaryKey)
                .AppendRequest(request);
                
            return stringBuilder.ToString();
        }
    }
}