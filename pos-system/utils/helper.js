export const updateStock = async (cartItems) => {
  try {
    const response = await fetch("/api/updateStock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems }),
    });

    if (!response.ok) {
      throw new Error("Failed to update stock");
    }

    console.log("Stock updated successfully");
  } catch (error) {
    console.error("Stock update error:", error);
  }
};
