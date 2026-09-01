export const createCategory = (req, res) => {
    const { title } = req.body;
    res.json({
        message: "Categoria creada exitosamente",
    });
};

export const getCategories = (req, res) => {
    res.json({
        message: "Listado de categorias",
    });
};

export const getCategoriesById = (req, res) => {
    const { id } =req.params;

    res.json({
        message: `Categoria con ID ${id}`,
    });
};

export const updateCategory = (req, res) => {
    const { id } =req.params;
    const { title } = req.body;

    res.json({ message: `Se actualizó el ${title} del ID ${id}`});

};

export const deleteCategory = (req, res) => {
    const { id } =req.params;
    res.json({ message: `Categoria ID ${id} borrada`});
};