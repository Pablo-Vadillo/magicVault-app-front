import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

export type Magic = {
  object: string;
id: string;
oracle_id: string;
multiverse_ids: number[];
arena_id: number;
name: string;
lang: string;
released_at: string;
uri: string;
scryfall_uri: string;
layout: string;
highres_image: boolean;
image_status: string;
image_uris: {
  small: string;
  normal: string;
  large: string;
  png: string;
  art_crop: string;
  border_crop: string;
};
mana_cost: string;
cmc: number;
type_line: string;
oracle_text: string;
power: string;
toughness: string;
colors: string[];
color_identity: string[];
keywords: string[];
all_parts: {
  object: string;
  id: string;
  component: string;
  name: string;
  type_line: string;
  uri: string;
}[];
legalities: {
  standard: string;
  future: string;
  historic: string;
  timeless: string;
  gladiator: string;
  pioneer: string;
  explorer: string;
  modern: string;
  legacy: string;
  pauper: string;
  vintage: string;
  penny: string;
  commander: string;
  oathbreaker: string;
  brawl: string;
  historicbrawl: string;
  alchemy: string;
  paupercommander: string;
  duel: string;
  oldschool: string;
  premodern: string;
  predh: string;
};
games: string[];
reserved: boolean;
foil: boolean;
nonfoil: boolean;
finishes: string[];
oversized: boolean;
promo: boolean;
reprint: boolean;
variation: boolean;
set_id: string;
set: string;
set_name: string;
set_type: string;
set_uri: string;
set_search_uri: string;
scryfall_set_uri: string;
rulings_uri: string;
prints_search_uri: string;
collector_number: string;
digital: boolean;
rarity: string;
card_back_id: string;
artist: string;
artist_ids: string[];
illustration_id: string;
border_color: string;
frame: string;
security_stamp: string;
full_art: boolean;
textless: boolean;
booster: boolean;
story_spotlight: boolean;
prices: {
  usd: number | null;
  usd_foil: number | null;
  usd_etched: number | null;
  eur: number | null;
  eur_foil: number | null;
  tix: number | null;
};
related_uris: {
  tcgplayer_infinite_articles: string;
  tcgplayer_infinite_decks: string;
  edhrec: string;
};
};

const App = () => {
  const [commanderData, setCommanderData] = useState<Magic | null>(null);

  const fetchRandomCommander = async () => {
    try {
      const url = 'https://api.scryfall.com/cards/random?q=is%3Acommander';
      const response = await axios.get<Magic>(url);
      setCommanderData(response.data);
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener el comandante');
      console.error(error);
    }
  };

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
        />
      </View>
      <TouchableOpacity style={styles.card} onPress={fetchRandomCommander}>
        <Text style={styles.cardText}>Comandante del día</Text>
        {commanderData && commanderData.image_uris ? (
          <Image
            source={{ uri: commanderData.image_uris.normal }}
            style={styles.commanderImage}
          />
        ) : null}
        {commanderData ? <Text style={styles.commanderName}>{commanderData.name}</Text> : null}
      </TouchableOpacity>
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton} />
        <TouchableOpacity style={styles.navButton} />
        <TouchableOpacity style={styles.navButton} />
        <TouchableOpacity style={styles.navButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  card: {
    backgroundColor: '#444',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  commanderImage: {
    width: 200,
    height: 280,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  commanderName: {
    color: '#FFD700',
    fontSize: 16,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#222',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  navButton: {
    width: 60,
    height: 50,
    backgroundColor: '#555',
    borderRadius: 8,
  },
});

export default App;
