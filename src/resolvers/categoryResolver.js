import categoryModel from "../models/categoryModel.js";

const categoryResolver = {


Query:{
  getCategories: async ()=>{
    try{
        const categories = await categoryModel.getAllCategories();
        return categories;
        }
        catch(error){
            console.log(error);
            throw new Error('Error  ' + error.message)

            }

  },

  getCategoryById: async(_,{id})=>{
    try{
        const category = await categoryModel.getCategoryById(id);
        if (!category){
            throw new Error("Category not found");
            }
            
        return category;

  } catch(error){
    console.log(error);
    throw new Error('Error  ' + error.message)

    }
    },
    getCategoryByName:async (_,{name})=>{
        try{
            const category = await categoryModel.getCategoryByName(name);
            if (!category){
                throw new Error("Category not found");
                }

            }catch(error){
                console.log(error);
                throw new Error('Error  ' + error.message)
            }
        }
},
Mutation:{
    createCategory:async(_,{name,description})=>{
        try{
            
                const existingCategory = await categoryModel.getCategoryByName(name);
                if (existingCategory){
                    throw new Error("Category already exists");
                    }
            
            const category = await categoryModel.createCategory(name,description);
            return category;
            }
            catch(error){
                console.log(error);
                throw new Error('Error  ' + error.message)
                }
                },

                updateCategory: async(_,{id,input})=>{
                    try{
                        const updateFields={}
                        console.log(input)

                        if(input.name){
                            const existingCategory = await categoryModel.getCategoryByName(input.name);
                            if (existingCategory && existingCategory.id !== id){
                                throw new Error("Category already exists");
                                }
                                updateFields.name=input.name
                        }
                        if(input.description){
                            updateFields.description=input.description
                        }

                        const category = await categoryModel.updateCategory(id,updateFields);
                        return category;
                        }
                        catch(error){
                            console.log(error);
                            throw new Error('Error  ' + error.message)
                            }
                },
                deleteCategory:async(_,{id})=>{
                    try{
                        const category = await categoryModel.deleteCategory(id);
                        return category;
                        }
                        catch(error){
                            console.log(error);
                            throw new Error('Error  ' + error.message)
                            }
                            }


}


}

export default categoryResolver;