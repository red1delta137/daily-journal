import React from 'react';
import { useEffect } from 'react';
import { View, StyleSheet, Keyboard, Alert } from 'react-native';
import { Text, Card, Input, Button, Divider } from '@ui-kitten/components';
import { setItem, getItem, getAllEntries } from "../backend/storage";
import { SafeAreaView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function TodaysLog() {

    const today = new Date().toLocaleDateString();
    const [highs, setHighs] = React.useState('');
    const [lows, setLows] = React.useState('');
    const emojis = ["😞", "😐", "🙂", "😊", "🤩"];
    const [selected, setSelected] = React.useState<number | null>(null);
    const todayKey = `journal:${new Date().toISOString().slice(0, 10)}`;

    async function saveEntry() {

        const entry = {
            highs,
            lows,
            mood: selected
        };

        const todayKey = `journal:${new Date().toISOString().slice(0, 10)}`
        await setItem(todayKey, entry);
        console.log("Saving entry:", entry);
        Alert.alert("Saving entry", JSON.stringify(entry));
    }

    async function clearForm() {
        const entries = await getAllEntries();
        console.log("entries:", entries);
        setHighs("");
        setLows("");
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContainer}
                extraScrollHeight={24}
                enableOnAndroid
                keyboardOpeningTime={0}
            >
                <Card style={styles.card}>
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
                                    <Text
                                        style={{ fontSize: 28, lineHeight: 32 }}
                                        allowFontScaling={false}
                                    >
                                        {emoji}
                                    </Text>
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
                </Card>
            </KeyboardAwareScrollView>
        </SafeAreaView>
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
        minHeight: 56,
        paddingVertical: 0
    },
    footerControl: {
        marginHorizontal: 2,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 20,
        gap: 8
    },
    card: {
        alignSelf: 'stretch',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 20
    },
    scrollContainer: {
        padding: 16,
    }
});