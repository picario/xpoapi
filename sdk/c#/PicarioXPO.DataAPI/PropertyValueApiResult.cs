using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class PropertyValueApiResult
    {
        [JsonProperty("value")]
        public string Value { get; set; }

        [JsonProperty("count")]
        public int Count { get; set; }
    }
}