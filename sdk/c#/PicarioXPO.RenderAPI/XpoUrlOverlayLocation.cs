namespace PicarioXPO.RenderAPI
{
    /// <summary>
    /// Defines an overlay location based on an x and y location
    /// </summary>
    public struct XpoUrlOverlayLocation
    {
        private int x;
        private int y;

        /// <summary>
        /// Gets or sets the x-coordinate of this <see cref="T:PicarioXPO.RenderAPI.XpoUrlOverlayLocation"/>.
        /// </summary>
        /// 
        /// <returns>
        /// The x-coordinate of this <see cref="T:PicarioXPO.RenderAPI.XpoUrlOverlayLocation"/>.
        /// </returns>
        public int X
        {
            get
            {
                return this.x;
            }
            set
            {
                this.x = value;
            }
        }

        /// <summary>
        /// Gets or sets the y-coordinate of this <see cref="T:PicarioXPO.RenderAPI.XpoUrlOverlayLocation"/>.
        /// </summary>
        /// 
        /// <returns>
        /// The y-coordinate of this <see cref="T:PicarioXPO.RenderAPI.XpoUrlOverlayLocation"/>.
        /// </returns>
        public int Y
        {
            get
            {
                return this.y;
            }
            set
            {
                this.y = value;
            }
        }

        public XpoUrlOverlayLocation(int x, int y)
        {
            this.x = x;
            this.y = y;
        }

        public override string ToString()
        {
            return string.Format("{0}.{1}", X, Y);
        }
    }
}