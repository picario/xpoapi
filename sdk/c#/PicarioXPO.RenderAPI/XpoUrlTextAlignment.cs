﻿using System.Diagnostics.CodeAnalysis;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines the different text alignments for XPO
    /// </summary>
    [SuppressMessage("Microsoft.Design", "CA1008:EnumsShouldHaveZeroValue", Justification = "Enum values have to match current URL api values which start with 1.")]
    public enum XpoUrlTextAlignment
    {
        Left = 0,

        Middle = 1,

        Right = 2
    }
}
