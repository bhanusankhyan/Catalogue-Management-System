(this["webpackJsonpcms-client"]=this["webpackJsonpcms-client"]||[]).push([[0],{26:function(e,t,a){},33:function(e,t,a){e.exports=a(46)},38:function(e,t,a){},46:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(14),c=a.n(s),l=(a(38),a(5)),o=a(6),i=a(7),d=a(8),m=a(1),u=a(9),h=(a(26),a(32)),p=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"mt-2"},r.a.createElement(h.a,{value:this.props.selectedItem,onChange:this.props.onChange,options:this.props.value,isMulti:!0,placeholder:this.props.placeholder}))}}]),t}(r.a.Component),g=a(2),y=a(17),b=a(11),f=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).handleSubmit=function(t){if(t.preventDefault(),""!==e.state.productName.trim()){var a=[{product_name:e.state.productName.replace(/\s+/g," ").trim(),brand_id:e.state.brandID,category_id:e.state.categoryID,specs_keys:e.state.specsKeys,description:e.state.description}];fetch("/api/create-product",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(t){"success"===t.result?(alert("Product Created Successfully"),e.props.refreshList("products"),e.setState({modalShow:!1}),e.setState({productName:"",specsKeys:[{key:"",value:"",unit:""}]})):alert(t.result+" Please Try Again")}))}else alert("Please Enter Product Name")},e.handleChange=function(t){if(["key","value","unit"].includes(t.target.className)){var a=Object(y.a)(e.state.specsKeys);a[t.target.dataset.id][t.target.className]=t.target.value,e.setState({specsKeys:a})}else e.setState(Object(g.a)({},t.target.name,t.target.value))},e.state={modalShow:!1,productName:"",brandID:"",categoryID:"",specsKeys:[{key:"",value:"",unit:""}],brands:[],categories:[],description:""},e.onShowModal=e.onShowModal.bind(Object(m.a)(e)),e.onHideModal=e.onHideModal.bind(Object(m.a)(e)),e.addSpecifications=e.addSpecifications.bind(Object(m.a)(e)),e.handleSubmit=e.handleSubmit.bind(Object(m.a)(e)),e.deleteSpecifications=e.deleteSpecifications.bind(Object(m.a)(e)),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"onShowModal",value:function(){var e=this;fetch("/api/select-category").then((function(e){return e.json()})).then((function(t){return e.setState({categories:t},(function(){e.setState({categoryID:e.state.categories[0].category_id})}))})),fetch("/api/brands").then((function(e){return e.json()})).then((function(t){return e.setState({brands:t},(function(){e.setState({brandID:e.state.brands[0].brand_id})}))})),this.setState({modalShow:!0})}},{key:"onHideModal",value:function(){this.setState({modalShow:!1}),this.setState({productName:""}),this.setState({specsKeys:[{key:"",value:"",unit:""}]})}},{key:"addSpecifications",value:function(){var e=this.state.specsKeys;void 0!==e&&(""===e[e.length-1].key.trim()||""===e[e.length-1].value.trim()?alert("Please Enter Previous Key and Value"):this.setState((function(e){return{specsKeys:[].concat(Object(y.a)(e.specsKeys),[{key:"",value:"",unit:""}])}})))}},{key:"deleteSpecifications",value:function(){var e=this.state.specsKeys;e.length>1&&(e.pop(),this.setState({specsKeys:e}))}},{key:"render",value:function(){var e=this.state,t=e.productName,a=e.specsKeys;return r.a.createElement("span",null,r.a.createElement("button",{className:"btn btn-outline-dark",onClick:this.onShowModal},"Create Product"),r.a.createElement(b.a,{size:"lg",show:this.state.modalShow,onHide:this.onHideModal,"aria-labelledby":"example-modal-sizes-title-lg"},r.a.createElement(b.a.Header,{closeButton:!0},r.a.createElement(b.a.Title,{id:"example-modal-sizes-title-lg"},"Create New Product")),r.a.createElement(b.a.Body,null,r.a.createElement("form",{onSubmit:this.handleSubmit,onChange:this.handleChange},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"productName"},"Product Name"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Product Name",name:"productName",value:t,id:"productName"})),r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"selectBrand"},"Brand Name"),r.a.createElement("select",{name:"brandID",className:"form-control",id:"selectBrand"},this.state.brands.map((function(e){return r.a.createElement("option",{value:e.brand_id,key:e.brand_id},e.brand_name)}))))),r.a.createElement("div",{className:"row mt-4"},r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"selectCategory"},"Category Name"),r.a.createElement("select",{name:"categoryID",className:"form-control",id:"selectCategory"},this.state.categories.map((function(e){return r.a.createElement("option",{value:e.category_id,key:e.category_id},e.category_name)}))))),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement("h4",null,"Specifications ",r.a.createElement("button",{type:"button",className:"btn btn-outline-dark",onClick:this.addSpecifications}," Add + ")," \xa0",r.a.createElement("button",{type:"button",className:"btn btn-outline-dark",onClick:this.deleteSpecifications}," Delete - "))),a.map((function(e,t){var n="key-".concat(t),s="value-".concat(t),c="unit-".concat(t);return r.a.createElement("div",{className:"form-row mt-4",key:t},r.a.createElement("div",{className:"form-group col-md-4"},r.a.createElement("input",{type:"text",placeholder:"Key",className:"key","data-id":t,value:a[t].key,name:n,id:n})),r.a.createElement("div",{className:"form-group col-md-4"},r.a.createElement("input",{type:"text",placeholder:"Value",className:"value",id:s,value:a[t].value,name:s,"data-id":t})),r.a.createElement("div",{className:"form-group col-md-4"},r.a.createElement("input",{type:"text",placeholder:"Unit",className:"unit",id:c,value:a[t].unit,name:c,"data-id":t})))})),r.a.createElement("div",{className:"form-group mt-4"},r.a.createElement("label",{htmlFor:"productDescription"},"Product Description"),r.a.createElement("textarea",{name:"description",className:"form-control",id:"productDescription",rows:"3"})),r.a.createElement("div",{className:"mt-3 text-center"},r.a.createElement("button",{type:"submit",className:"btn btn-outline-dark"}," Create "))))))}}]),t}(r.a.Component),v=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).state={modalShow:!1,brandName:""},e.handleBrandName=e.handleBrandName.bind(Object(m.a)(e)),e.createBrand=e.createBrand.bind(Object(m.a)(e)),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"handleBrandName",value:function(e){this.setState({brandName:e.target.value})}},{key:"createBrand",value:function(e){var t=this;if(e.preventDefault(),""!==this.state.brandName.trim()){var a=[{brand_name:this.state.brandName.replace(/\s+/g," ").trim()}];fetch("/api/createbrand",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){1===e[0].result?t.setState({modalShow:!1},(function(){alert("Brand Successfully Added"),t.props.refreshList("brands")})):alert(e[0].result+" Please Try Again")}))}else alert("Please Enter a Brand Name")}},{key:"render",value:function(){var e=this;return r.a.createElement("span",null,r.a.createElement("button",{className:"btn btn-outline-dark ml-2",onClick:function(){return e.setState({modalShow:!0})}},"Create Brand"),r.a.createElement(b.a,{size:"lg",show:this.state.modalShow,onHide:function(){return e.setState({modalShow:!1})},"aria-labelledby":"example-modal-sizes-title-lg"},r.a.createElement(b.a.Header,{closeButton:!0},r.a.createElement(b.a.Title,{id:"example-modal-sizes-title-lg"},"Create New Brand")),r.a.createElement(b.a.Body,null,r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"productName"},"Brand Name"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Brand Name",onChange:this.handleBrandName,id:"brandName"}))),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement("button",{className:"btn btn-outline-dark",onClick:this.createBrand}," Create "))))))}}]),t}(r.a.Component),E=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).state={modalShow:!1,parentCategoryData:[],categoryName:"",parentCategory:""},e.showModal=e.showModal.bind(Object(m.a)(e)),e.handleParentCategory=e.handleParentCategory.bind(Object(m.a)(e)),e.createCategory=e.createCategory.bind(Object(m.a)(e)),e.handleCategoryName=e.handleCategoryName.bind(Object(m.a)(e)),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"showModal",value:function(){var e=this;this.setState({modalShow:!0}),fetch("/api/select-category").then((function(e){return e.json()})).then((function(t){return e.setState({parentCategoryData:t})}))}},{key:"handleParentCategory",value:function(e){this.setState({parentCategory:e.target.value})}},{key:"createCategory",value:function(e){var t=this;if(e.preventDefault(),""!==this.state.categoryName.trim()){var a=[{category_name:this.state.categoryName.replace(/\s+/g," ").trim(),parent_name:this.state.parentCategory}];fetch("/api/create-category",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){1===e[0].result?(alert("Category created Successfully!!"),t.setState({modalShow:!1}),t.props.refreshList("categories")):alert(e[0].result+" Please Try Again")}))}else alert("Please enter Category Name")}},{key:"handleCategoryName",value:function(e){this.setState({categoryName:e.target.value})}},{key:"render",value:function(){var e=this;return r.a.createElement("span",null,r.a.createElement("button",{className:"btn btn-outline-dark ml-2",onClick:this.showModal},"Create Category"),r.a.createElement(b.a,{size:"lg",show:this.state.modalShow,onHide:function(){return e.setState({modalShow:!1})},"aria-labelledby":"example-modal-sizes-title-lg"},r.a.createElement(b.a.Header,{closeButton:!0},r.a.createElement(b.a.Title,{id:"example-modal-sizes-title-lg"},"Create New Category")),r.a.createElement(b.a.Body,null,r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"categoryName"},"Category Name"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Category Name",onChange:this.handleCategoryName,id:"categoryName"})),r.a.createElement("div",{className:"col"},r.a.createElement("label",{htmlFor:"selectParent"},"Parent Category Name"),r.a.createElement("select",{className:"form-control",id:"selectParent",onChange:this.handleParentCategory},r.a.createElement("option",{value:""},"None"),this.state.parentCategoryData.map((function(e){return r.a.createElement("option",{value:e.category_name,key:e.category_id},e.category_name)}))))),r.a.createElement("div",{className:"text-center mt-4"},r.a.createElement("button",{className:"btn btn-outline-dark",onClick:this.createCategory}," Create "))))))}}]),t}(r.a.Component),C=a(20),N=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(d.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"row"},this.props.products.map((function(e){return r.a.createElement("div",{className:"col-lg-4 mb-3 text-center",key:e.product_id},r.a.createElement(C.b,{className:"link",to:"/product/".concat(e.slug)},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-header"},r.a.createElement("h5",null,e.product_name)),"Brand : ",e.brand_name,r.a.createElement("br",null),"Category : ",e.category_name,r.a.createElement("br",null),"Parent Category : ",e.parent_name)))})))}}]),t}(r.a.Component),S=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).state={modalShow:!1,categoryData:[],categoryName:"",changeParent:[],changedParentname:"",categoryChangedName:"",showChange:!1},e.onCategoryChange=e.onCategoryChange.bind(Object(m.a)(e)),e.onCategoryNameChange=e.onCategoryNameChange.bind(Object(m.a)(e)),e.onParentChange=e.onParentChange.bind(Object(m.a)(e)),e.onEditCategory=e.onEditCategory.bind(Object(m.a)(e)),e.onShowModal=e.onShowModal.bind(Object(m.a)(e)),e.onHideModal=e.onHideModal.bind(Object(m.a)(e)),e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"onShowModal",value:function(){var e=this;this.setState({modalShow:!0}),fetch("/api/select-category").then((function(e){return e.json()})).then((function(t){e.setState({categoryData:t})}))}},{key:"onHideModal",value:function(){this.setState({modalShow:!1}),this.setState({changeParent:[]}),this.setState({showChange:!1})}},{key:"onCategoryChange",value:function(e){var t=this;this.setState({categoryName:e.target.value}),this.setState({categoryChangedName:e.target.value}),fetch("/api/edit-category/".concat(e.target.value)).then((function(e){return e.json()})).then((function(e){t.setState({changeParent:e}),t.setState({showChange:!0})}))}},{key:"onEditCategory",value:function(e){var t=this;e.preventDefault(),fetch("/api/edit-category",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({category_name:this.state.categoryName,category_new_name:this.state.categoryChangedName.replace(/\s+/g," ").trim(),parent_new_name:this.state.changedParentname})}).then((function(e){return e.json()})).then((function(e){"success"===e.result?(t.setState({modalShow:!1}),alert("Changes Saved"),window.location.href="/"):alert("Please Try Again")}))}},{key:"onCategoryNameChange",value:function(e){this.setState({categoryChangedName:e.target.value})}},{key:"onParentChange",value:function(e){this.setState({changedParentname:e.target.value})}},{key:"render",value:function(){return r.a.createElement("span",null,r.a.createElement("button",{className:"btn btn-outline-dark ml-2",onClick:this.onShowModal},"Edit Category"),r.a.createElement(b.a,{size:"lg",show:this.state.modalShow,onHide:this.onHideModal,"aria-labelledby":"example-modal-sizes-title-lg"},r.a.createElement(b.a.Header,{closeButton:!0},r.a.createElement(b.a.Title,{id:"example-modal-sizes-title-lg"},"Edit Category")),r.a.createElement(b.a.Body,null,r.a.createElement("form",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-12"},r.a.createElement("label",{htmlFor:"selectCategory"},"Category Name"),r.a.createElement("select",{className:"form-control",id:"selectCategory",onChange:this.onCategoryChange},r.a.createElement("option",{value:""},"None"),this.state.categoryData.map((function(e){return r.a.createElement("option",{value:e.category_name,key:e.category_id},e.category_name)}))))),r.a.createElement("br",null),this.state.showChange?r.a.createElement("span",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-6"},r.a.createElement("label",{htmlFor:"productName"},"Category New Name"),r.a.createElement("input",{type:"text",className:"form-control",name:"productName",onChange:this.onCategoryNameChange,value:this.state.categoryChangedName,id:"productName"})),r.a.createElement("div",{className:"col-md-6"},r.a.createElement("label",{htmlFor:"selectParent"},"Select New Parent"),r.a.createElement("select",{name:"parent",className:"form-control",onChange:this.onParentChange,id:"selectParent"},r.a.createElement("option",{value:""},"None"),this.state.changeParent.map((function(e){return r.a.createElement("option",{value:e.category_name,key:e.category_id},e.category_name)})))),r.a.createElement("br",null)),r.a.createElement("div",{className:"mt-3 text-center"},r.a.createElement("button",{className:"btn btn-outline-dark",onClick:this.onEditCategory}," Save Changes "))):r.a.createElement("div",null)))))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(d.a)(t).call(this,e))).onBrandsChange=function(e){var t=a.state.filter;t[0].brands=e,t[1].categories=a.state.selectedCategory,a.setState({filter:t}),a.setState({selectedBrand:e},(function(){fetch("/api/product_listing",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.state.filter)}).then((function(e){return e.json()})).then((function(e){return a.setState({displayProducts:e},(function(){null==a.state.selectedBrand&&null==a.state.selectedCategory&&a.setState({displayProducts:a.state.products})}))}))}))},a.onCategoryChange=function(e){null==a.state.selectedBrand&&null==a.state.selectedCategory&&a.setState({displayProducts:a.state.products});var t=a.state.filter;t[0].brands=a.state.selectedBrand,t[1].categories=e,a.setState({filter:t},(function(){fetch("/api/product_listing",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(a.state.filter)}).then((function(e){return e.json()})).then((function(e){a.setState({displayProducts:e},(function(){null==a.state.selectedBrand&&null==a.state.selectedCategory&&a.setState({displayProducts:a.state.products})}))}))})),a.setState({selectedCategory:e})},a.state={products:[],displayProducts:[],brandFilter:[],categoryFilter:[],selectedBrand:null,CategoryFilter:[],selectedCategory:null,filter:[{brands:[]},{categories:[]}],refreshList:["brands"]},a.onBrandsChange=a.onBrandsChange.bind(Object(m.a)(a)),a.handleFilters=a.handleFilters.bind(Object(m.a)(a)),a.setRefreshList=a.setRefreshList.bind(Object(m.a)(a)),a}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.fetchProducts(),this.fetchCategories(),this.fetchBrands();for(var e=document.getElementsByClassName("css-1hb7zxy-IndicatorsContainer");e.length>0;)e[0].remove()}},{key:"shouldComponentUpdate",value:function(e,t){return 1===t.refreshList.length&&!0===t.refreshList[0].includes("categories")&&t.refreshList[0]!==this.state.refreshList[0]?(this.fetchCategories(),!0):1===t.refreshList.length&&!0===t.refreshList[0].includes("brands")&&t.refreshList[0]!==this.state.refreshList[0]?(this.fetchBrands(),!0):1!==t.refreshList.length||!0!==t.refreshList[0].includes("products")||t.refreshList[0]===this.state.refreshList[0]||(this.fetchProducts(),!0)}},{key:"fetchCategories",value:function(){var e=this;fetch("api/select-category").then((function(e){return e.json()})).then((function(t){var a=[];for(var n in t)a.push({label:t[n].category_name,value:t[n].category_name});e.setState({categoryFilter:a})}))}},{key:"fetchProducts",value:function(){var e=this;fetch("/api/products").then((function(e){return e.json()})).then((function(t){e.setState({products:t}),e.setState({displayProducts:t})}))}},{key:"fetchBrands",value:function(){var e=this;fetch("/api/brands").then((function(e){return e.json()})).then((function(t){var a=[];for(var n in t)a.push({label:t[n].brand_name,value:t[n].brand_name});e.setState({brandFilter:a})}))}},{key:"handleFilters",value:function(){this.setState({displayProducts:this.state.products}),this.setState({selectedBrand:null}),this.setState({selectedCategory:null})}},{key:"setRefreshList",value:function(e){var t=Math.floor(1e6*Math.random());this.setState({refreshList:[e+t]})}},{key:"render",value:function(){return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"head"},r.a.createElement("h2",{className:"text-center"},"Products")),r.a.createElement("div",{className:"mb-3 form-group "},r.a.createElement(f,{refreshList:this.setRefreshList}),r.a.createElement(v,{refreshList:this.setRefreshList}),r.a.createElement(E,{refreshList:this.setRefreshList}),r.a.createElement(S,null)),r.a.createElement("div",{className:"row m-1"},r.a.createElement("div",{className:"col-lg-3"},r.a.createElement("div",{className:"card"},r.a.createElement("h6",{className:"text-center"},"Filter By")),r.a.createElement(p,{value:this.state.brandFilter,selectedItem:this.state.selectedBrand,onChange:this.onBrandsChange,placeholder:"Select Brands"}),r.a.createElement(p,{value:this.state.categoryFilter,selectedItem:this.state.selectedCategory,onChange:this.onCategoryChange,placeholder:"Select Categories"}),r.a.createElement("button",{className:"btn btn-outline-dark mt-2",onClick:this.handleFilters},"Reset Filters")),r.a.createElement("div",{className:"col-lg-9"},r.a.createElement(N,{products:this.state.displayProducts}))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(43),a(44);var j=a(19);var O=function(){return r.a.createElement("h1",null,"Page Not Found")},w=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).state={productCheck:!1,productData:[],specifications:[],breadcrum:[],breadcrum_links:[]},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/product/".concat(this.props.match.params.id)).then((function(e){return e.json()})).then((function(t){!0===t[0].product&&(e.setState({productData:t[0].product_data}),e.setState({specifications:t[0].specifications}),e.setState({productCheck:!0}),e.setState({breadcrum:t[0].breadcrum}))}))}},{key:"render",value:function(){var e=this.state.productData[0];return r.a.createElement("div",{className:"container"},!0===this.state.productCheck?r.a.createElement("div",{className:"mt-5"},r.a.createElement("nav",{"aria-label":"breadcrumb"},r.a.createElement("ol",{className:"breadcrumb"},r.a.createElement("li",{className:"breadcrumb-item","aria-current":"page"},r.a.createElement(C.b,{to:"/products"},"Home")),this.state.breadcrum.map((function(e){return r.a.createElement("li",{className:"breadcrumb-item","aria-current":"page",key:e.link},r.a.createElement(C.b,{to:"/products"+e.link},e.category_name))})),r.a.createElement("li",{className:"breadcrumb-item","aria-current":"page"},e.product_name))),r.a.createElement("div",{className:"card mt-5"},r.a.createElement("div",{className:"card-header text-center"},r.a.createElement("h1",null,e.product_name)),r.a.createElement("div",{className:"card-body"},r.a.createElement("div",{className:"text-center"},"Brand : ",e.brand_name,r.a.createElement("br",null),"Category : ",e.category_name,r.a.createElement("br",null),"Parent Name : ",e.parent_name,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("h5",null,"Specifications"),this.state.specifications.map((function(e){return r.a.createElement("div",{key:e.key},e.key," : ",e.value," ",e.unit)})))),r.a.createElement("div",{className:"card-footer"},r.a.createElement("h5",{className:"text-center"},"Descripton"),r.a.createElement("div",{className:"row d-flex justify-content-center"},r.a.createElement("div",{className:" col-lg-4"},e.description))))):r.a.createElement(O,null))}}]),t}(r.a.Component),P=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(i.a)(this,Object(d.a)(t).call(this))).onBrandsChange=function(t){e.setState({selectedBrand:t},(function(){return e.dataChange()}))},e.onCategoryChange=function(t){e.setState({selectedCategory:t},(function(){e.dataChange()}))},e.state={products:[],displayProducts:[],breadcrum:[],breadcrum_links:[],flag:!1,brandFilter:[],categoryFilter:[],selectedBrand:null,selectedCategory:null,filter:[{brands:[]},{categories:[]}],hierCheck:!0},e}return Object(u.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/api/hier/".concat(this.props.match.params[0])).then((function(e){return e.json()})).then((function(t){if(!0===t.result){e.setState({hierCheck:!0}),e.setState({displayProducts:t.data}),e.setState({products:t.data}),e.setState({breadcrum_links:t.breadcrum});var a=[],n=[],r=e.state.products;for(var s in r)a.push({label:r[s].brand_name,value:r[s].brand_name}),n.push({label:r[s].category_name,value:r[s].category_name});var c=Object(y.a)(new Map(a.map((function(e){return[JSON.stringify(e),e]}))).values()),l=Object(y.a)(new Map(n.map((function(e){return[JSON.stringify(e),e]}))).values());e.setState({brandFilter:c}),e.setState({categoryFilter:l});for(var o=document.getElementsByClassName("css-1hb7zxy-IndicatorsContainer");o.length>0;)o[0].remove()}else e.setState({hierCheck:!1})}))}},{key:"dataChange",value:function(){var e=this,t=this.state.filter;t[0].brands=this.state.selectedBrand,t[1].categories=this.state.selectedCategory,null==t[1].categories?t[1].categories=this.state.categoryFilter:null==t[0].brands?t[0].brands=this.state.brandFilter:null==t[0].brands&&null==t[1].categories?this.setState({displayProducts:this.state.products}):(t[0].brands=this.state.selectedBrand,t[1].categories=this.state.selectedCategory),this.setState({filter:t},(function(){fetch("/api/product_listing",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e.state.filter)}).then((function(e){return e.json()})).then((function(t){return e.setState({displayProducts:t},(function(){null==e.state.selectedBrand&&null==e.state.selectedCategory&&e.setState({displayProducts:e.state.products})}))}))}))}},{key:"handleFilters",value:function(){this.setState({displayProducts:this.state.products}),this.setState({selectedBrand:null}),this.setState({selectedCategory:null})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,!0===this.state.hierCheck?r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"mt-5"},r.a.createElement("nav",{"aria-label":"breadcrumb"},r.a.createElement("ol",{className:"breadcrumb"},r.a.createElement("li",{className:"breadcrumb-item","aria-current":"page"},r.a.createElement("a",{href:"/"},"Home")),this.state.breadcrum_links.map((function(t,a){return r.a.createElement("li",{className:"breadcrumb-item","aria-current":"page",key:t.link},e.state.breadcrum_links.length-1!==a?r.a.createElement("a",{href:"/products"+t.link},t.category_name):r.a.createElement("span",null,t.category_name," "))})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-3"},r.a.createElement("div",{className:"card"},r.a.createElement("h6",{className:"text-center"},"Filter By")),r.a.createElement(p,{value:this.state.brandFilter,selectedItem:this.state.selectedBrand,onChange:this.onBrandsChange,placeholder:"Select Brands"}),r.a.createElement(p,{value:this.state.categoryFilter,selectedItem:this.state.selectedCategory,onChange:this.onCategoryChange,placeholder:"Select Categories"}),r.a.createElement("button",{className:"btn btn-outline-dark mt-2",onClick:this.handleFilters.bind(this)},"Reset Filters")),r.a.createElement("div",{className:"col-lg-9"},r.a.createElement(N,{products:this.state.displayProducts}))))):r.a.createElement(O,null))}}]),t}(r.a.Component),B=r.a.createElement(C.a,null,r.a.createElement(j.d,null,r.a.createElement(j.b,{exact:!0,path:"/",component:k}),r.a.createElement(j.b,{exact:!0,path:"/product/:id",component:w}),r.a.createElement(j.a,{exact:!0,path:"/products",to:"/"}),r.a.createElement(j.b,{exact:!0,path:"/products/*",component:P}),r.a.createElement(j.b,{component:O})));c.a.render(B,document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[33,1,2]]]);
//# sourceMappingURL=main.f2638c39.chunk.js.map