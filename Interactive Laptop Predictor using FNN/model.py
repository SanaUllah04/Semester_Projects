import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input
from tensorflow.keras.optimizers import Adam
import tensorflow as tf
from sklearn.metrics import mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt

df = pd.read_csv("limited_df.csv")

features = [
    'Inches', 'Ram', 'Weight', 'CPU Frequency', 'Memory Amount', 
    'Screen Width', 'Screen Height', 'Intel_CPU', 'Nvidia_GPU', 
    'AMD_CPU', 'AMD_GPU', 'Intel_GPU', 'ARM_GPU'
]
X = df[features]
y = df['Price_euros']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

model = Sequential([
    Input(shape=(X_train_scaled.shape[1],)),
    Dense(128, activation='relu'),
    Dense(96, activation='relu'),
    Dense(64, activation='relu'),
    Dense(48, activation='relu'),
    Dense(32, activation='relu'),
    Dense(1)   
])

model.compile(optimizer=Adam(learning_rate=0.001), loss='mse', metrics=['mae'])

history = model.fit(
    X_train_scaled, y_train,
    validation_data=(X_test_scaled, y_test),
    epochs=20,
    batch_size=32,
    verbose=1
)

test_loss, test_mae = model.evaluate(X_test_scaled, y_test, verbose=0)

y_pred = model.predict(X_test_scaled, verbose=0)
test_mse = mean_squared_error(y_test, y_pred)
test_rmse = np.sqrt(test_mse)

print(f"\nTest MSE: {test_mse:.2f} euros^2")
print(f"Test MAE: {test_mae:.2f} euros")
print(f"Test RMSE: {test_rmse:.2f} euros")

plt.figure(figsize=(10, 6))
plt.plot(history.history['mae'], label='Training MAE')
plt.plot(history.history['val_mae'], label='Validation MAE')
plt.title('Mean Absolute Error')
plt.xlabel('Epochs')
plt.ylabel('MAE')
plt.legend()
plt.show()


# Save the trained model
model.save('laptop_price_model.h5')
print("Model saved!")

# Save the scaler
import pickle
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)
print("Scaler saved!")