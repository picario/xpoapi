using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace PicarioXPO.RenderAPI.V2.DesignKeyExtractors
{
    internal abstract class DesignKey
    {
        private static readonly CultureInfo AmericanCulture = new CultureInfo("en-US");

        private readonly List<string> keyList = new List<string>();

        protected void AddToList<T>(T value, bool omitIfDefault = true)
        {
            if ((Equals(value, default(T)) || string.IsNullOrEmpty(value.ToString())) && omitIfDefault)
            {
                AddEmpty();
                return;
            }

            if (value is Enum)
                keyList.Add(Convert.ToInt32(value).ToString(CultureInfo.InvariantCulture));
            
            keyList.Add(value.ToString());
        }

        protected void AddToList(double value, bool omitIfDefault = true)
        {
            var convertedValue = ConvertNumberToCultureNumber(value, omitIfDefault);

            if (!string.IsNullOrEmpty(convertedValue) || omitIfDefault == false)
                keyList.Add(ConvertNumberToCultureNumber(value, omitIfDefault));
        }

        protected void AddEmpty()
        {
            keyList.Add("");
        }

        protected string GetUrlValue()
        {
            return string.Join(",", keyList.ToArray());
        }

        protected bool IsEmpty()
        {
            return keyList.All(string.IsNullOrEmpty);
        }

        protected static string ConvertNumberToCultureNumber(double number, bool omitIfDefault = true)
        {
            if (Equals(number, default(double)) && omitIfDefault)
                return "";
            
            return number.ToString(AmericanCulture.NumberFormat);
        }

        public abstract string GetValues(IEnumerable<XpoUrlObject> designs);
    }
}