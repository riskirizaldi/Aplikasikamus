import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';
import axios from 'axios';

export default function Beranda() {
    const [kataBaru, setKataBaru] = useState("");
    const [kataDiperiksa, setKataDiperiksa] = useState("");
    const [definisi, setDefinisi] = useState("");
    const [contoh, setContoh] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [sound, setSound] = useState(null);

    const cariKata = (kataMasuk) => {
        setKataBaru(kataMasuk);
    };

    const getInfo = async () => {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${kataBaru}`;

        try {
            const response = await axios.get(url);
            const fetchedData = response.data;

            if (response.status === 200) {
                setData(fetchedData);

                let kata = fetchedData[0].word;
                setKataDiperiksa(kata);

                let def = fetchedData[0].meanings[0].definitions[0].definition;
                setDefinisi(def);

                let eg = fetchedData[0].meanings[0].definitions[0].example;
                setContoh(eg);

                setError(null);
            } else {
                setError("Kata tidak ditemukan dalam database");
                setTimeout(() => {
                    setError(null);
                }, 3000);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Terjadi kesalahan saat mengambil data");
            setTimeout(() => {
                setError(null);
            }, 3000);
        }
    };

    const putarAudio = () => {
        if (data && data[0].phonetics && data[0].phonetics[0] && data[0].phonetics[0].audio) {
            const audioUri = data[0].phonetics[0].audio;

            if (sound) {
                sound.stop(() => {
                    sound.release();
                    setSound(null);
                });
            }

            const newSound = new Sound(audioUri, '', (error) => {
                if (error) {
                    console.error('Error loading sound:', error);
                } else {
                    setSound(newSound);
                    newSound.play(() => {
                        newSound.release();
                        setSound(null);
                    });
                }
            });
        }
    };

    const bersihkan = () => {
        setKataDiperiksa("");
        setDefinisi("");
        setContoh("");
        setKataBaru("");

        if (sound) {
            sound.stop(() => {
                sound.release();
                setSound(null);
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Aplikasi Kamus</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Cari..."
                    onChangeText={(text) => cariKata(text)}
                />
                <TouchableOpacity style={styles.button} onPress={() => getInfo()}>
                    <Text style={styles.buttonText}>Cari</Text>
                </TouchableOpacity>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
            {kataDiperiksa && !error && (
                <ScrollView contentContainerStyle={styles.resultsContainer}>
                    <Text style={styles.word}>{kataDiperiksa}</Text>
                    <TouchableOpacity style={styles.playButton} onPress={() => putarAudio()}>
                        <Text style={styles.playButtonText}>Suara</Text>
                    </TouchableOpacity>
                    <View style={styles.resultTextContainer}>
                        <Text style={styles.resultText}>Definisi: {definisi}</Text>
                        <Text style={styles.resultText}>Contoh: {contoh}</Text>
                    </View>
                </ScrollView>
            )}
            <TouchableOpacity style={styles.clearButton} onPress={() => bersihkan()}>
                <Text style={styles.buttonText}>Bersihkan</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#3498db',
        padding: 20,
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 23,
        marginTop: 10,
    },
    heading: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#2c3e50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
    },
    input: {
        flex: 1,
        padding: 15,
        fontSize: 18,
        color: '#333',
    },
    button: {
        backgroundColor: '#2980b9',
        padding: 15,
        marginLeft: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    resultsContainer: {
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#2c3e50',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 3,
        padding: 20,
        height: 300,
    },
    word: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    playButton: {
        backgroundColor: '#2ecc71',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    playButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    resultTextContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    resultText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    clearButton: {
        backgroundColor: '#e74c3c',
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
    },
    clearButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
});