namespace PicarioXPO.RenderAPI.V1.Extensions
{
    internal static class StringExtensions
    {
        public static string Join(this string[] input)
        {
            return string.Join("", input);
        }

        public static string Join(this string[] input, string seperator)
        {
            return string.Join(seperator, input);
        }
    }
}
