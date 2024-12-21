import { j as jsxRuntimeExports } from "./jsx-runtime-BcIfvQoK.js";
import { importShared } from "./__federation_fn_import-Ca_-J8Zi.js";
const { Button, useSnackbarController } = await importShared("@firecms/cloud");
function SampleEntityView({
  entity,
  modifiedValues
}) {
  const snackbarController = useSnackbarController();
  const onClick = (event) => {
    snackbarController.open({
      type: "success",
      message: `Custom action for ${modifiedValues?.name}`
    });
  };
  const values = modifiedValues ?? {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-auto flex flex-col items-center justify-items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 md:p-16 flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This is an example of a custom view added as a panel to an entity collection." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Values in the form:" }),
      values && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "font-mono",
          style: {
            color: "#fff",
            padding: "16px",
            fontSize: ".85em",
            borderRadius: "4px",
            backgroundColor: "#4e482f"
          },
          children: JSON.stringify(values, null, 2)
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick, color: "primary", children: "Your action" })
  ] }) });
}
const { buildCollection, buildProperty } = await importShared("@firecms/cloud");
const demoCollection = buildCollection({
  id: "demo",
  name: "Demo",
  path: "demo",
  properties: {
    // string property with validation
    name: {
      dataType: "string",
      name: "Name",
      validation: {
        required: true
      }
    },
    // simple boolean
    available: buildProperty({
      dataType: "boolean",
      name: "Available"
    }),
    // you can define this property dynamically, and modify it based on the values of other properties
    price: ({ values }) => ({
      dataType: "number",
      title: "Price",
      validation: {
        requiredMessage: "You must set a price between 0 and 1000",
        min: 0,
        max: 1e3
      },
      disabled: !values.available && {
        clearOnDisabled: true,
        disabledMessage: "You can only set the price on available items"
      },
      description: "Price with range validation"
    }),
    // multiline
    description: {
      dataType: "string",
      name: "Description",
      multiline: true
    },
    // markdown
    text: {
      dataType: "string",
      name: "Blog text",
      markdown: true
    },
    // array of strings
    ingredients: {
      name: "Ingredients",
      dataType: "array",
      of: {
        dataType: "string"
      }
    },
    // url
    amazon_link: {
      dataType: "string",
      name: "Amazon link",
      url: true,
      validation: {
        required: true,
        requiredMessage: "The amazon link is required"
      }
    },
    // email
    user_email: {
      dataType: "string",
      name: "User email",
      email: true
    },
    // single selection
    category: {
      dataType: "string",
      name: "Category",
      enumValues: {
        art_design_books: "Art and design books",
        backpacks: "Backpacks and bags",
        bath: "Bath",
        bicycle: "Bicycle",
        books: "Books"
      }
    },
    // multiple selection
    locale: {
      name: "Available locales",
      dataType: "array",
      of: {
        dataType: "string",
        enumValues: {
          es: "Spanish",
          en: "English",
          fr: {
            id: "fr",
            label: "French",
            disabled: true
          }
        }
      },
      defaultValue: [
        "es"
      ]
    },
    // date
    expiry: {
      dataType: "date",
      name: "Expiry date",
      mode: "date"
    },
    // date and time
    arrival_time: {
      dataType: "date",
      name: "Arrival time",
      mode: "date_time"
    },
    // auto update on create
    created_at: {
      dataType: "date",
      name: "Created at",
      autoValue: "on_create"
    },
    // auto update on update
    updated_on: {
      dataType: "date",
      name: "Updated at",
      autoValue: "on_update"
    },
    // storing a single image
    main_image: {
      dataType: "string",
      name: "Main image",
      storage: {
        storagePath: "images",
        acceptedFiles: [
          "image/*"
        ],
        maxSize: 1e6,
        metadata: {
          cacheControl: "max-age=1000000"
        }
      }
    },
    // storing multiple images
    images: {
      dataType: "array",
      name: "Images",
      of: {
        dataType: "string",
        storage: {
          storagePath: "images",
          acceptedFiles: [
            "image/*"
          ],
          metadata: {
            cacheControl: "max-age=1000000"
          }
        }
      },
      description: "This fields allows uploading multiple images at once"
    },
    // group of properties
    address: {
      name: "Address",
      dataType: "map",
      properties: {
        street: {
          name: "Street",
          dataType: "string"
        },
        postal_code: {
          name: "Postal code",
          dataType: "number"
        }
      },
      expanded: true
    },
    // reference to another collection
    client: {
      dataType: "reference",
      path: "users",
      name: "Related client"
    },
    // multiple references to another collection
    related_products: {
      dataType: "array",
      name: "Related products",
      of: {
        dataType: "reference",
        path: "products"
      }
    },
    // block of content with dynamic properties
    content: {
      name: "Content",
      dataType: "array",
      oneOf: {
        typeField: "type",
        valueField: "value",
        properties: {
          images: {
            dataType: "string",
            name: "Image",
            storage: {
              storagePath: "images",
              acceptedFiles: [
                "image/*"
              ]
            }
          },
          text: {
            dataType: "string",
            name: "Text",
            markdown: true
          },
          products: {
            name: "Products",
            dataType: "array",
            of: {
              dataType: "reference",
              path: "products"
            }
          }
        }
      }
    }
  }
});
const appConfig = {
  version: "1",
  collections: [
    demoCollection
  ],
  propertyConfigs: [{
    name: "String with color",
    key: "color",
    property: {
      dataType: "string",
      name: "Main color",
      Preview: ({ value }) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          width: 20,
          height: 20,
          backgroundColor: value,
          borderRadius: "4px"
        } });
      }
    }
  }],
  entityViews: [
    {
      key: "sample_entity_view",
      name: "Sample entity view",
      Builder: SampleEntityView
    }
  ]
};
export {
  appConfig as default
};
