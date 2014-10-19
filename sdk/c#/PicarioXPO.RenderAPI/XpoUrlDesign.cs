using System;

namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Represents a design from a Picario scene for the XPO URL generator
    /// </summary>
    public sealed class XpoUrlDesign
    {
        /// <summary>
        /// Gets or sets the index of this overlay
        /// </summary>
        public int Index { get; set; }

        /// <summary>
        /// Gets or sets the index of this overlay
        /// </summary>
        public int SameIndex { get; set; }

        /// <summary>
        /// Gets or sets the type for this object
        /// </summary>
        public XpoUrlObjectTypes ObjectType { get; set; }

        /// <summary>
        /// Gets or sets the filename for this object
        /// </summary>
        public string EntityName { get; set; }

        /// <summary>
        /// Gets or sets the width of this object
        /// </summary>
        public double Width { get; set; }

        /// <summary>
        /// Gets or sets the height of this object
        /// </summary>
        public double Height { get; set; }

        /// <summary>
        /// Gets or sets the gloss of this object
        /// </summary>
        public double Gloss { get; set; }

        /// <summary>
        /// Gets of sets the contrast of this object
        /// </summary>
        public double Contrast { get; set; }

        /// <summary>
        /// Gets or sets the drop x of this object
        /// </summary>
        public double DropX { get; set; }

        /// <summary>
        /// Gets or sets the drop y of this object
        /// </summary>
        public double DropY { get; set; }

        /// <summary>
        /// Gets or sets the placing point x of this object
        /// </summary>
        public double PlacingPointX { get; set; }

        /// <summary>
        /// Gets or sets the placing point y of this object
        /// </summary>
        public double PlacingPointY { get; set; }

        /// <summary>
        /// Gets or sets the transformation for this object
        /// </summary>
        [Obsolete("No longer used in version 2. Use the Rotation and Flip parameters.")]
        public XpoUrlObjectTransformations Transformation { get; set; }
        
        /// <summary>
        /// Gets or sets the rotation for this object
        /// </summary>
        public int Rotation { get; set; }

        /// <summary>
        /// Gets or sets whether the texture should be flipped
        /// </summary>
        public bool Flip { get; set; }

        /// <summary>
        /// Specifies whether the design should repeat itself throughout the object.
        /// </summary>
        public bool Repeat { get; set; }
    }
}
