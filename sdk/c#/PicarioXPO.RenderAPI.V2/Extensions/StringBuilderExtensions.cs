using System;
using System.Collections.Generic;
using System.Text;

namespace PicarioXPO.RenderAPI.V2.Extensions
{
    internal static class StringBuilderExtensions
    {
        public static StringBuilder Append(this StringBuilder stringBuilder, string key, bool value, bool omitIfDefault = true)
        {
            return stringBuilder.Append(key, value ? "1" : omitIfDefault ? "" : "0", omitIfDefault);
        }

        public static StringBuilder Append(this StringBuilder stringBuilder, string key, bool? value, bool omitIfDefault = true)
        {
            return value.HasValue ? stringBuilder.Append(key, value.Value ? "1" : omitIfDefault ? "" : "0", omitIfDefault) : stringBuilder;
        }

        public static StringBuilder Append<T>(this StringBuilder stringBuilder, string key, T value, bool omitIfDefault = true) 
        {
            if ((Equals(value, default (T)) || string.IsNullOrEmpty(value.ToString())) && omitIfDefault)
            {
                return stringBuilder;
            }

            if (value is Enum)
            {
                return stringBuilder.Append(key, Convert.ToInt32(value));
            }

            return stringBuilder.AppendFormat("&{0}={1}", key, value);
        }

        public static StringBuilder Append<T>(this StringBuilder stringBuilder, int index, string key, T value, bool omitIfDefault = true)
        {
            return stringBuilder.Append(key + index, value, omitIfDefault);
        }

        public static StringBuilder AppendDictionary(this StringBuilder stringBuilder, Dictionary<string, object> values)
        {
            foreach (var param in values)
            {
                if (!string.IsNullOrEmpty(param.Key) && param.Value != null)
                {
                    stringBuilder.Append(param.Key, param.Value, false);
                }
            }

            return stringBuilder;
        }
    }
}