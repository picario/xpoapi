namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Holds the URL in 2 different parts (the filename part and the querystring part)
    /// </summary>
    public sealed class XpoUrlParts
    {
        /// <summary>
        /// Gets the filename part of the URL
        /// </summary>
        public string FileName { get; set; }

        /// <summary>
        /// Gets the querystring part of the url
        /// </summary>
        public string QueryString { get; set; }

        public XpoUrlParts(string fileName, string queryString)
        {
            FileName = fileName;
            QueryString = queryString;
        }
    }
}
