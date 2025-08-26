import React from 'react';
import { View, StyleSheet, Keyboard, Alert } from 'react-native';
import { Text, Card, Input, Button, Divider } from '@ui-kitten/components';
import {setItem, getItem, getAllEntries} from "../backend/storage";


export default function TodaysLog() {

    const today = new Date().toLocaleDateString();
    const [highs, setHighs] = React.useState('');
    const [lows, setLows] = React.useState('');
    const emojis = ["😞", "😐", "🙂", "😊", "🤩"];
    const [selected, setSelected] = React.useState<number | null>(null);
    const todayKey = `journal:${new Date().toISOString().slice(0,10)}`;

    async function saveEntry() {
        
        const entry = {
            highs,
            lows,
            mood: selected
        };

        const todayKey = `journal:${new Date().toISOString().slice(0,10)}`
        await setItem(todayKey, entry);
        console.log("Saving entry:", entry);
        Alert.alert("Saving entry", JSON.stringify(entry));
    }

    async function clearForm() {
        const all = await getAllEntries();
        console.log("Entries: ", all);
    }


    return (
        <View style={styles.row}>
            <Text style={styles.text} category='h1'>TODAY</Text>
            <Text style={styles.date} category='p1'>{today}</Text>
            <View style={styles.emojiRow}>
                {emojis.map((emoji, idx) => (
                    <Button
                        key={idx}
                        size="large"
                        appearance={selected === idx ? "filled" : "outline"}
                        style={styles.emojiButton}
                        onPress={() => setSelected(idx)}
                    >
                        {emoji}
                    </Button>
                ))}
            </View>
            <Card style={styles.card}>
                <Text style={styles.xlight} category='p1'>Highs</Text>
                <Input
                    placeholder='Enter highs of the day'
                    value={highs}
                    onChangeText={value => setHighs(value)}
                    style={{ marginBottom: 5 }}
                    maxLength={250}
                    multiline
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    textStyle={{ minHeight: 120 }}
                />
                <Divider />
                <Text style={styles.xlight} category='p1'>Lows</Text>
                <Input
                    placeholder='Enter lows of the day'
                    value={lows}
                    onChangeText={value => setLows(value)}
                    style={{ marginBottom: 5 }}
                    maxLength={250}
                    multiline
                    returnKeyType="done"
                    onSubmitEditing={Keyboard.dismiss}
                    textStyle={{ minHeight: 120 }}
                />
            </Card>
            <View style={styles.footerControl}>
                <Button size='large' status='basic' onPress={clearForm}>CLEAR</Button>
                <Button size='large' onPress={saveEntry}>SAVE</Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        alignItems: 'stretch',
    },
    text: {
        marginBottom: 4,
    },
    date: {
        marginTop: 5,
        fontSize: 24
    },
    card: {
        marginTop: 20
    },
    xlight: {
        marginBottom: 3,
        fontSize: 24
    },
    emojiRow: {
        flexDirection: "row",
        justifyContent: "space-between", 
        marginVertical: 8,
        marginTop: 20
    },
    emojiButton: {
        flex: 1,
        marginHorizontal: 4,
    },
    footerControl: {
        marginHorizontal: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
        gap: 8
      },
});