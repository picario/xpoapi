using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class EntityApiPropertyInfo
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("value")]
        public object Value { get; set; }
    }
}