# Add this to the end of your existing training script

# After training your model, add these lines to save the model and scaler:

# Save the trained model
model.save('laptop_price_model.h5')
print("Model saved as 'laptop_price_model.h5'")

# Save the scaler for later use
import pickle
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
print("Scaler saved as 'scaler.pkl'")

# Optional: Save feature names for reference
feature_names = [
    'Inches', 'Ram', 'Weight', 'CPU Frequency', 'Memory Amount', 
    'Screen Width', 'Screen Height', 'Intel_CPU', 'Nvidia_GPU', 
    'AMD_CPU', 'AMD_GPU', 'Intel_GPU', 'ARM_GPU'
]

with open('feature_names.pkl', 'wb') as f:
    pickle.dump(feature_names, f)
print("Feature names saved as 'feature_names.pkl'")

# Print model summary for verification
print("\nModel Summary:")
model.summary()

# Print feature order for reference
print("\nFeature Order (IMPORTANT - must match frontend):")
for i, feature in enumerate(feature_names):
    print(f"{i}: {feature}")