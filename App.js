import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, PaperProvider, Snackbar, TextInput } from 'react-native-paper';
import CurrencyButton from './components/CurrencyButton';
import { currencyByRupee } from './assets/constants';
import { useState } from 'react';

export default function App() {

  const [visible, setVisible] = useState(false);
  const onToggleSnackBar = () => setVisible(!visible);
  const onDismissSnackBar = () => setVisible(false);

  const [inputValue, setInputValue]= useState("")
  const [resultValue, setResultValue]= useState("")
  const [targetCurrency, setTargetCurrency]= useState("")

  //logic to handfle button press
  const buttonPressed = (targetValue) => {
    if(!inputValue){
      setVisible(()=>true);
      return (
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            setVisible(false);
          },
        }} > Please provide an input </Snackbar>
    )}
    const inputAmmout = parseFloat(inputValue);
    if(!isNaN(inputAmmout)){
      const result = inputAmmout *targetValue.value;
      const resultValue = `${targetValue.symbol}  ${result.toFixed(2)}`;
      setResultValue(resultValue);
      setTargetCurrency(targetValue.name);
    }
    else{
      return(
        <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            setVisible(false);
          },
        }} > Please provide a valid number to convert </Snackbar>
      )
    }

  } 

  return (
    <>
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.rupeesContainer}>
            <Text style={styles.rupee}>₹</Text>
            <TextInput
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' //only for iOS
            onChangeText={setInputValue}
            keyboardType='number-pad'
            placeholder='Enter amount in Rupees'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt} >
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={item => item.name}
            renderItem={({item}) => (
              <Pressable
              style={[
                styles.button, 
                targetCurrency === item.name && styles.selected
              ]}
              onPress={() => buttonPressed(item)}
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#515151',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
    marginTop:79,
  },
  rupee: {
    marginRight: 18,
    fontSize: 32,
    color: '#000000',
    fontWeight: '800',
  },
  rupeesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    top:70
  },
  inputAmountField: {
    height: 60,
    width: 200,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,

    margin: 12,
    height: 60,

    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});
