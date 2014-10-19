using System;
using System.Text;

namespace PicarioXPO.RenderAPI.V1
{
    public class XpoV1UrlGenerator : IXpoUrlGenerator
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
            var baseUri = GetXpoImageUrl(request);

            var stringBuilder = new StringBuilder(baseUri);
            stringBuilder
                .AppendFormat("{0}={1}", GeneralKeys.EntityType, (int)request.FileType)
                .AppendRequest(request);


            foreach (var xpoUrlObject in request.Objects)
            {
                var index = xpoUrlObject.Index;
                stringBuilder
                    .Append(index, xpoUrlObject.Design)
                    .Append(index, xpoUrlObject.Color)
                    .Append(index, xpoUrlObject.Text);
            }

            return stringBuilder.ToString();
        }

        public string GetUrl(XpoCoordinatesUrlRequest request)
        {
            var baseUri = GetXpoCoordsUrl();

            var stringBuilder = new StringBuilder(baseUri);
            stringBuilder.AppendRequest(request);

            return stringBuilder.ToString();
        }

        private string GetXpoBaseUrl(XpoUrlRequest request)
        {
            if (request == null)
                throw new ArgumentNullException("request");

            if(string.IsNullOrWhiteSpace(request.AbsoluteUrl))
                throw new InvalidOperationException("Cannot use the XPO V1 implementation without supplying a base URL (AbsoluteURL property in the request)");

            var uri = default(Uri);

            if (Uri.TryCreate(request.AbsoluteUrl, UriKind.Absolute, out uri))
            {
                return request.AbsoluteUrl;
            }

            throw new InvalidOperationException("Could not use the supplied AbsoluteURL because it is not valid");
        }

        private string GetXpoImageUrl(XpoImageUrlRequest imageRequest)
        {
            return EnsureXpoImageUrl(GetXpoBaseUrl(imageRequest));
        }

        private string GetXpoCoordsUrl()
        {
            return EnsureXpoCoordsUrl(GetXpoBaseUrl(null));
        }

        private static string CheckUrl(string url)
        {
            if (string.IsNullOrEmpty(url))
                throw new InvalidOperationException("PicarIS URL cannot be null or empty");

            if (!url.EndsWith("/"))
                url = url + "/";

            return url;
        }

        private static string EnsureXpoImageUrl(string url)
        {
            url = CheckUrl(url);

            return url + "getimage.ashx?";
        }

        private static string EnsureXpoCoordsUrl(string url)
        {
            url = CheckUrl(url);

            return url + "getcoords.ashx?";
        }
    }
}