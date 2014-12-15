#XPO Developer API

XPO uses a developer API that allows developers to extract information from their XPO environment.

In order to use the developer API you need an API key. This API key can be found in XPO on the account page if you have the right to use API.<br />
This API key can be used in two ways:

1.	Add the API key to the querystring(?apiKey=1234).
2.	Add the API key to the http header (the header name is the same as the querystring parameter).

<br />
The base URL for all API calls is: <br />

	http://{hostname}/xpo/api/v1/{documentType}

The API calls for the 4 document types(scene, design, image, project) are all the same.<br />
For the examples we will use design as entity type. <br />
The url uses the plural of the document type (scenes, designs, images, projects).

The developer needs viewing rights for all the document types he wants to use.

<br />
- GET &nbsp;&nbsp;&nbsp; /{id}

		Retreives a single entity
		Example: /xpo/api/v1/designs/1988/
<br />
- GET &nbsp;&nbsp;&nbsp; /byreference/{referenceId}

		Retrieves a single entity
		Example: /xpo/api/v1/designs/byreference/logo.png
<br />
- GET &nbsp;&nbsp;&nbsp; /multi/{entitiyIds}

		Returns a list of entities
		Restricted to a maximum of 50 entities
		Split entity ids by ,
		Example: /xpo/api/v1/designs/multi/673,641
<br />
- GET &nbsp;&nbsp;&nbsp; /stream/{skip}/{take}

		Returns a list of entities
		The default values are:
			Skip = 0
			Take = 50
		Skip and take can be specified in the url: /xpo/api/v1/designs/stream/50/100 (means: skip 50, take 100)
		Skip and take can also be specified separately in the querystring: /xpo/api/v1/designs/stream?skip=20&take=50
<br />
- GET &nbsp;&nbsp;&nbsp; /search/{searchTerm}/{skip}/{take}

		Returns a list of entities
		Searches the entityType with a fulltext search. The searchTerm is splitted on spaces before the search is applied.
		Skip and take parameters work the same as with the stream API call
<br />
- GET &nbsp;&nbsp;&nbsp; /bylabels/{labelIds}/{skip}/{take}

		Returns a list of entities
		Searching on one labelId also searches on the child labels of that label
		Searching on multiple labels result in an OR search for those labels
		Skip and take parameters work the same as with the stream API call
<br />
- GET &nbsp;&nbsp;&nbsp; /byproperties/{properties}/{skip}/{take}

		Format: name|values,name|values
		Multiple values for the same name need to be splitted by $
		Multiple values for the same name result in an OR filter for that name
		Multiple names result in an AND filter
		Skip and take parameters work the same as with the stream API call
		Example: /xpo/api/v1/designs/byproperties/material/cotton$silk
<br />
- GET &nbsp;&nbsp;&nbsp; /new/{skip}/{take}

		Returns a list of new entities(based on the date set in XPO that determines when an entity is considered new)
		Doesn’t work for projects
		Skip and take parameters work the same as with the stream API call
<br />
- GET &nbsp;&nbsp;&nbsp; /dump

		Returns a list of all the entities
		No skip and take parameters
		Requires the developer to have the Allow API dump right(this right can be added to a user, in XPO)
