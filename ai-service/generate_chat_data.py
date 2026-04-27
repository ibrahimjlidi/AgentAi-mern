import pandas as pd
import random

# Define intents and their example phrases
intents = {
    "greeting": [
        "Bonjour", "Salut", "Hello", "Hi", "Coucou", "Hey", "Bonjour l'assistant", 
        "Est-ce que tu es là ?", "Salu", "Bonjours", "Salut assistant"
    ],
    "electricity": [
        "Comment économiser de l'électricité ?", "J'ai trop de factures d'élec", 
        "C'est quoi un watt ?", "Eteindre les lumières", "Ampoules LED", 
        "Réduire le courant", "Consommation électrique trop haute", "Electricite",
        "Elec", "Électricité"
    ],
    "water": [
        "Comment économiser l'eau ?", "Douche ou bain ?", "L'eau est précieuse",
        "Ma facture d'eau est élevée", "Réparer une fuite", "Consommation d'eau",
        "Water", "Litre d'eau", "Douche courte"
    ],
    "recycling": [
        "Comment trier mes déchets ?", "Où jeter le plastique ?", "Recyclage du verre",
        "Poubelle jaune", "Tri sélectif", "Déchets", "Recycler", "Plastique", "Verre",
        "Papier", "Recyclage"
    ],
    "score": [
        "Comment est calculé mon score ?", "C'est quoi l'éco score ?", "Mon résultat",
        "Pourquoi mon score est bas ?", "Calcul du score", "Score", "Résultat",
        "Score d'analyse"
    ],
    "about": [
        "C'est quoi GreenLife ?", "À quoi sert ce projet ?", "Pourquoi ce site ?",
        "C'est quoi l'objectif ?", "Qui es-tu ?", "Pourquoi ?", "Raison"
    ]
}

def generate_chat_dataset(samples_per_intent=50):
    data = []
    for intent, phrases in intents.items():
        for _ in range(samples_per_intent):
            # Pick a base phrase and add some "noise" or slight variation
            phrase = random.choice(phrases)
            data.append({"text": phrase, "intent": intent})
            
    df = pd.DataFrame(data)
    # Shuffle the dataset
    df = df.sample(frac=1).reset_index(drop=True)
    df.to_csv("chat_dataset.csv", index=False)
    print(f"Generated {len(df)} samples in chat_dataset.csv")

if __name__ == "__main__":
    generate_chat_dataset()
