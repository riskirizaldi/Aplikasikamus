import React, { Component } from "react";
import { View, StyleSheet, Text, Switch, Modal, TouchableWithoutFeedback, TouchableOpacity } from "react-native";

class Setting extends Component {
    state = {
        tema: "default",
        bahasa: "Indonesia",
        modalVisible: false,
    };

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    };

    render() {
        return (
            <View style={styles.setting}>
                <View style={styles.settingItem}>
                    <Text style={styles.settingItemTitle}>Tema</Text>
                    <View style={styles.settingItemSwitch}>
                        <Switch
                            value={this.state.tema === "default"}
                            onValueChange={(value) => this.setState({ tema: value ? "default" : "dark" })}
                        />
                    </View>
                </View>
                <View style={styles.settingItem}>
                    <Text style={styles.settingItemTitle}>Bahasa</Text>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                        <Text>{this.state.bahasa}</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}
                    >
                        <TouchableWithoutFeedback onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                            <View style={styles.modalOverlay} />
                        </TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => this.setState({ bahasa: "Indonesia", modalVisible: false })}>
                                <Text>Indonesia</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.setState({ bahasa: "Inggris", modalVisible: false })}>
                                <Text>Inggris</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    setting: {
        flex: 1,
        backgroundColor: "#fff",
    },
    settingItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    settingItemTitle: {
        flex: 1,
        fontWeight: "bold",
    },
    settingItemSwitch: {
        flex: 1,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        padding: 16,
    },
});

export default Setting;
