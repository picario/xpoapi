using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class EntityApiLabelInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }
    }
}