using System;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Specifies style information applied to text.
    /// </summary>
    /// <filterpriority>2</filterpriority>
    [Flags]
    public enum TextFontStyle
    {
        Regular = 0,
        Bold = 1,
        Italic = 2,
        Underline = 4,
        Strikeout = 8,
    }
}
