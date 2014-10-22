using System;
using System.Web.Mvc;
using PicarioXPO.RenderAPI;
using PicarioXPO.RenderAPI.Fluent;
using PicarioXPO.RenderAPI.V2;
using XpoRenderApiNetDemo.ViewModels;

namespace XpoRenderApiNetDemo.Controllers
{
    public class HomeController : Controller
    {
        private readonly FluentXpoUrlFactory fluentXpoUrlFactory = new FluentXpoUrlFactory();
        private readonly XpoV2UrlGenerator xpoUrlGenerator = new XpoV2UrlGenerator();
        private readonly Database database = new Database();

        private const string BaseUrl = "http://demo.picarioxpo.com";

        private const int DefaultImageWidth = 250;
        private const int DefaultImageHeight = 250;

        public ActionResult Index()
        {
            var viewmodel = new IndexViewModel
            {
                DefaultSceneUrl = GetDefaultSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DefaultDesignUrl = GetDefaultDesignUrl(DefaultImageWidth, DefaultImageHeight),
                ColorSceneUrl = GetColorSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DefaultMappedSceneUrl = GetDefaultMappedSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignPlacingPointXSceneUrl = GetDesignPlacingPointXSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignPlacingPointYSceneUrl = GetDesignPlacingPointYSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignRepeatSceneUrl = GetDesignRepeatSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignDropXSceneUrl = GetDesignDropXSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignDropYSceneUrl = GetDesignDropYSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignFlipSceneUrl = GetDesignFlipSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignMirrorSceneUrl = GetDesignMirrorSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignMappedContrastSceneUrl = GetDesignMappedContrastSceneUrl(DefaultImageWidth, DefaultImageHeight),
                DesignContrastSceneUrl = GetDesignContrastSceneUrl(DefaultImageWidth, DefaultImageHeight)
            };
            return View(viewmodel);
        }

        private string GetDefaultSceneUrl(int width, int height)
        {
            // This function creates a basic image url for a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entity type is needed for the url generator to render the image correctly. 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .GetUrl();
        }

        private string GetDefaultDesignUrl(int width, int height)
        {
            // This function creates a basic image url for a design.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the design. This can be found in the PicarioXPO backend.
            // We choose png as image type, but we can also choose jpg or bmp.
            // The entity type is needed for the url generator to render the image correctly. 
            // If we want to render a design file(.pft) we need to use the design url image type.
            // If we want a normal image of the design we can use the image entity type.
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Design.ReferenceId)
                                     .SetEntityType(GetDesignUrlFileType(database.Design))
                                     .SetImageType(XpoUrlImageTypes.Png)
                                     .SetWidth(width)
                                     .GetUrl();
        }

        private string GetColorSceneUrl(int width, int height)
        {
            // This function creates an image url for a color rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The primary key should allways use the storage name of a scene when you render colors/design on it.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // We use the name of color to set the color but we can also use the hex notation or a rgb notation.
            // I.e. red is the same as ff0000 or 255_0_0
            // When adding a color you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Color("red");
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDefaultMappedSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.Design.ReferenceId)
                                            .SetWidth(database.Design.DisplayWidth)
                                            .SetHeight(database.Design.DisplayHeight);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignMappedContrastSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.ContrastDesign.ReferenceId)
                                            .SetWidth(database.ContrastDesign.DesignOptions.Width)
                                            .SetHeight(database.ContrastDesign.DesignOptions.Height);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignPlacingPointXSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the placing point x we can position the design along the x axis.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.
            
            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.Design.ReferenceId)
                                            .SetWidth(database.Design.DisplayWidth)
                                            .SetHeight(database.Design.DisplayHeight)
                                            .SetPlacingPointX(database.Design.DesignOptions.PlacingPointX);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignPlacingPointYSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the placing point y we can position the design along the y axis.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.Design.ReferenceId)
                                            .SetWidth(database.Design.DisplayWidth)
                                            .SetHeight(database.Design.DisplayHeight)
                                            .SetPlacingPointY(database.Design.DesignOptions.PlacingPointY);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignRepeatSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the repeat we can fill the scene object with the design.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.FloorDesign.ReferenceId)
                                            .SetWidth(database.FloorDesign.DesignOptions.Width)
                                            .SetHeight(database.FloorDesign.DesignOptions.Height)
                                            .SetRepeat(database.FloorDesign.DesignOptions.Repeat);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignDropXSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the repeat we can fill the scene object with the design.
            // By specifying the drop x we can influence the repeat sequence on the x axis.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.
            
            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.FloorDesign.ReferenceId)
                                            .SetWidth(database.FloorDesign.DesignOptions.Width)
                                            .SetHeight(database.FloorDesign.DesignOptions.Height)
                                            .SetRepeat(database.FloorDesign.DesignOptions.Repeat)
                                            .SetDropX(database.FloorDesign.DesignOptions.DropX);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignDropYSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the repeat we can fill the scene object with the design.
            // By specifying the drop y we can influence the repeat sequence on the y axis.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.FloorDesign.ReferenceId)
                                            .SetWidth(database.FloorDesign.DesignOptions.Width)
                                            .SetHeight(database.FloorDesign.DesignOptions.Height)
                                            .SetRepeat(database.FloorDesign.DesignOptions.Repeat)
                                            .SetDropY(database.FloorDesign.DesignOptions.DropY);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignFlipSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The primary key should allways use the storage name of a scene when you render colors/design on it.
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the flip parameter we can flip the design on the x axis.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.Design.ReferenceId)
                                            .SetWidth(database.Design.DisplayWidth)
                                            .SetHeight(database.Design.DisplayHeight)
                                            .SetFlip(database.Design.DesignOptions.Flip)
                                            .SetPlacingPointX(database.Design.DesignOptions.PlacingPointX)
                                            .SetPlacingPointY(database.Design.DesignOptions.PlacingPointY);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignMirrorSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // By specifying the flip parameter we can flip the design on the x axis.
            // You can also rotate the design by 90, 180 or 270 degrees.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.Design.ReferenceId)
                                            .SetWidth(database.Design.DisplayWidth)
                                            .SetHeight(database.Design.DisplayHeight)
                                            .SetFlip(database.Design.DesignOptions.Flip)
                                            .SetRotation(database.Design.DesignOptions.Rotation)
                                            .SetPlacingPointX(database.Design.DesignOptions.PlacingPointX)
                                            .SetPlacingPointY(database.Design.DesignOptions.PlacingPointY);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }

        private string GetDesignContrastSceneUrl(int width, int height)
        {
            // This function creates an image url for a design rendered on a scene.
            // The reason we don't set the height is because the render engine will calculate the correct height based on the width we provide.
            // The primary key is used by our render engine to find the correct file to render the image.
            // We use the referece id of the scene. This can be found in the PicarioXPO backend.
            // We choose jpg as image type, but we can also choose png or bmp.
            // The entitytype is allways Scene when we want to render a scene so the render engine will use the scene file (.pfs). 
            // We use the base url of our demo website as the absolute url, the url generator will add the baseurl to the generated url.
            // Not all files can be used to render so we use the correct render file for the design.
            // We also set the width and height that should be used to render the design.
            // We can alter the contrast of the rendered design by setting the contrast property when adding the design to an object.
            // When adding a design you also need to specify the index of the object, in this case we use the first object.

            var fluentUrlGenerator = GetFluentXpoImageUrlGenerator();
            return fluentUrlGenerator.SetPrimaryKey(database.Scene.ReferenceId)
                                     .SetImageType(XpoUrlImageTypes.Jpg)
                                     .SetEntityType(XpoUrlFileTypes.Scene)
                                     .SetWidth(GetSmallestWidth(database.Scene.DisplayWidth, width))
                                     .AddObject(obj =>
                                     {
                                         obj.Design(database.ContrastDesign.ReferenceId)
                                            .SetWidth(database.ContrastDesign.DesignOptions.Width)
                                            .SetHeight(database.ContrastDesign.DesignOptions.Height)
                                            .SetContrast(database.ContrastDesign.DesignOptions.Contrast);
                                         obj.XpoObject.Index = 0;
                                     })
                                     .GetUrl();
        }
        
        private static XpoUrlFileTypes GetDesignUrlFileType(Design design)
        {
            if (design.DesignType == DesignTypes.Pft)
                return XpoUrlFileTypes.Design;

            return XpoUrlFileTypes.Image;
        }

        private IFluentXpoUrlGenerator GetFluentXpoImageUrlGenerator()
        {
            // Create a new fluent url generator. The fluent url generator needs a normal url generator and an url type.
            // You can choose between an Image url and a Coordinates url.

            return fluentXpoUrlFactory.CreateFluentUrlGenerator(xpoUrlGenerator, FluentXpoUrlType.Image)
                                      .SetAbsoluteUrl(BaseUrl);
        }

        /// <summary>
        /// Returns the smallest width in comparison to the proposed width
        /// </summary>
        /// <param name="displayWidth">The width of the entity</param>
        /// <param name="proposedWidth">The proposed width of the entity. If the entity is actually smaller then this, the width of the entity is returned</param>
        public static int GetSmallestWidth(int displayWidth, int proposedWidth)
        {
            return Math.Min(displayWidth, proposedWidth);
        }
    }
}
