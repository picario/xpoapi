using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class AttachmentApiResult
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }
    }
}