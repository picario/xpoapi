using System.Collections.Generic;
using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class EntityApiPropertyPerLabelInfo
    {
        [JsonProperty("label")]
        public EntityApiLabelInfo Label { get; set; }

        [JsonProperty("properties")]
        public List<EntityApiPropertyInfo> Properties { get; set; }
    }
}