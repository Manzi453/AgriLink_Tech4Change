// Handler functions
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const photoUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, photo: photoUrl }));
    }
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity(prev => ({ ...prev, [name]: value }));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([...products, { ...newProduct, id: newId }]);
    setShowProductForm(false);
    setNewProduct({
      name: "",
      quantity: "",
      price: "",
      image: null,
      farmer: "Current User"
    });
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleSubmitSettings = (e, section) => {
    e.preventDefault();
    alert(`${section} settings updated successfully!`);
  };

