import csv
import random

def calculate_score(electricity, water, recycling):
    raw_score = 100 - (electricity * 0.05) - (water * 0.002) + (recycling * 0.2)
    # Add a little bit of noise so it's not a perfectly linear exact fit
    noise = random.uniform(-2.0, 2.0)
    score = max(0.0, min(100.0, raw_score + noise))
    return round(score, 1)

def generate_dataset(filename="dataset.csv", num_samples=1000):
    with open(filename, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(["electricity", "water", "recycling", "eco_score"])
        
        for _ in range(num_samples):
            # Generate realistic synthetic data
            electricity = round(random.uniform(50, 600), 1)
            water = round(random.uniform(1000, 10000), 1)
            recycling = round(random.uniform(0, 100), 1)
            
            score = calculate_score(electricity, water, recycling)
            
            writer.writerow([electricity, water, recycling, score])
            
    print(f"Generated {num_samples} samples in {filename}")

if __name__ == "__main__":
    generate_dataset()
