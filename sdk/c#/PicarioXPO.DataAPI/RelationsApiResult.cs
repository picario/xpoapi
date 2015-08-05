using System.Collections.Generic;
using Newtonsoft.Json;

namespace PicarioXPO.DataAPI
{
    public class RelationsApiResult
    {
        [JsonProperty("direct")]
        public IEnumerable<int> Direct { get; set; }
    }
}