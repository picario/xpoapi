using System;

namespace PicarioXPO.RenderAPI.Fluent
{
    /// <summary>
    /// Used by FluentXPOUrlGenerator for design configuration
    /// </summary>
    public sealed class FluentXpoUrlDesign
    {
        /// <summary>
        /// Returns the wrapped XpoUrlDesign
        /// </summary>
        public XpoUrlDesign XpoUrlDesign { get; private set; }

        /// <summary>
        /// Creates a new instance of the FluentXpoUrlDesign
        /// </summary>
        public FluentXpoUrlDesign(string fileName)
        {
            XpoUrlDesign = new XpoUrlDesign {EntityName = fileName};
        }

        /// <summary>
        /// Sets the index for this object
        /// </summary>
        public FluentXpoUrlDesign SetSameIndex(int index)
        {
            XpoUrlDesign.SameIndex = index;

            return this;
        }

        /// <summary>
        /// Sets the type for this object
        /// </summary>
        public FluentXpoUrlDesign SetType(XpoUrlObjectTypes type)
        {
            XpoUrlDesign.ObjectType = type;

            return this;
        }

        /// <summary>
        /// Sets the width of this object
        /// </summary>
        public FluentXpoUrlDesign SetWidth(double width)
        {
            XpoUrlDesign.Width = width;

            return this;
        }

        /// <summary>
        /// Sets the height of this object
        /// </summary>
        public FluentXpoUrlDesign SetHeight(double height)
        {
            XpoUrlDesign.Height = height;

            return this;
        }

        /// <summary>
        /// Sets the gloss of this object
        /// </summary>
        public FluentXpoUrlDesign SetGloss(double gloss)
        {
            XpoUrlDesign.Gloss = gloss;

            return this;
        }

        /// <summary>
        /// Sets the contrast of this object
        /// </summary>
        public FluentXpoUrlDesign SetContrast(double contrast)
        {
            XpoUrlDesign.Contrast = contrast;

            return this;
        }

        /// <summary>
        /// Sets the drop x of this object
        /// </summary>
        public FluentXpoUrlDesign SetDropX(double dropX)
        {
            XpoUrlDesign.DropX = dropX;

            return this;
        }

        /// <summary>
        /// Sets the drop y of this object
        /// </summary>
        public FluentXpoUrlDesign SetDropY(double dropY)
        {
            XpoUrlDesign.DropY = dropY;

            return this;
        }

        /// <summary>
        /// Sets the placing point x of this object
        /// </summary>
        public FluentXpoUrlDesign SetPlacingPointX(double pointX)
        {
            XpoUrlDesign.PlacingPointX = pointX;

            return this;
        }

        /// <summary>
        /// Sets the placing point y of this object
        /// </summary>
        public FluentXpoUrlDesign SetPlacingPointY(double pointY)
        {
            XpoUrlDesign.PlacingPointY = pointY;

            return this;
        }

        /// <summary>
        /// Sets the transformation for this object
        /// </summary>
        [Obsolete("No longer used in version 2. Use the Rotation and Flip parameters.")]
        public FluentXpoUrlDesign SetTransformation(XpoUrlObjectTransformations transformation)
        {
            XpoUrlDesign.Transformation = transformation;

            return this;
        }

        /// <summary>
        /// Sets the rotation for this object (only used in combination with transformation)
        /// </summary>
        public FluentXpoUrlDesign SetRotation(int rotation)
        {
            XpoUrlDesign.Rotation = rotation;

            return this;
        }

        /// <summary>
        /// Sets wheter the texture should flip
        /// </summary>
        public FluentXpoUrlDesign SetFlip(bool flip)
        {
            XpoUrlDesign.Flip = flip;

            return this;
        }

        /// <summary>
        /// Sets the repeat for this object
        /// </summary>
        public FluentXpoUrlDesign SetRepeat(bool repeat)
        {
            XpoUrlDesign.Repeat = repeat;

            return this;
        }

        /// <summary>
        /// Sets the aspect ratio for this object
        /// </summary>
        public FluentXpoUrlDesign SetAspectRatio(bool aspectRatio)
        {
            XpoUrlDesign.AspectRatio = aspectRatio;

            return this;
        }
    }
}
