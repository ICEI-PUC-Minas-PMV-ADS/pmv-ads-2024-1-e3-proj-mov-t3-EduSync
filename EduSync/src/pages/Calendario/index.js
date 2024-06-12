import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect ,useLayoutEffect} from 'react';
import { View, Text,Button, StyleSheet, TextInput, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';

import CustomHeader from '../../components/CustomHeader';
import CustomNavBar from '../../components/CustomNavBar';

LocaleConfig.locales['pt'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt';

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

// Função para formatar a data para o formato DD/MM/YYYY
const formatDateToDisplay = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};

const Calendario = () => {
  const [markedDates, setMarkedDates] = useState({});
  const [event, setEvent] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentMonthHolidays, setCurrentMonthHolidays] = useState({});

  const addEvent = (date) => {
    const timestamp = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo' }); // Adiciona a hora atual no horário brasileiro
    setMarkedDates({
      ...markedDates,
      [date]: { selected: true, marked: true, event: event, timestamp: timestamp }
    });
    setEvent('');
    setModalVisible(false);
  };

  const removeEvent = (date) => {
    const newMarkedDates = { ...markedDates };
    delete newMarkedDates[date];
    setMarkedDates(newMarkedDates);
  };

  const onMonthChange = (month) => {
    const newCurrentMonthHolidays = Object.keys(globalHolidays)
      .filter(date => date.startsWith(`${month.year}-${month.month < 10 ? '0' : ''}${month.month}`))
      .reduce((obj, key) => {
        obj[key] = globalHolidays[key];
        return obj;
      }, {});
    setCurrentMonthHolidays(newCurrentMonthHolidays);
  };


// Função para gerar feriados globais para um determinado ano
const generateGlobalHolidays = (year) => {
  return {
    [`${year}-01-01`]: { marked: true, dotColor: 'red', activeOpacity: 0, description: 'Ano Novo' },
    [`${year}-02-12`]: { marked: true, dotColor: 'orange', activeOpacity: 0, description: 'Carnaval ' },
    [`${year}-02-13`]: { marked: true, dotColor: 'orange', activeOpacity: 0, description: 'Carnaval ' },
    [`${year}-02-14`]: { marked: true, dotColor: 'orange', activeOpacity: 0, description: 'Quarta-feira de cinzas ' },
    [`${year}-03-29`]: { marked: true, dotColor: 'purple', activeOpacity: 0, description: 'Sexta-feira Santa' },
    [`${year}-04-21`]: { marked: true, dotColor: 'green', activeOpacity: 0, description: 'Dia de Tiradentes' },
    [`${year}-05-01`]: { marked: true, dotColor: 'blue', activeOpacity: 0, description: 'Dia do Trabalhador' },
    [`${year}-09-07`]: { marked: true, dotColor: 'yellow', activeOpacity: 0, description: 'Dia da Independência' },
    [`${year}-10-12`]: { marked: true, dotColor: 'pink', activeOpacity: 0, description: 'Nossa Senhora Aparecida - Dia das Crianças' },
    [`${year}-11-02`]: { marked: true, dotColor: 'gray', activeOpacity: 0, description: 'Dia de Finados' },
    [`${year}-11-15`]: { marked: true, dotColor: 'cyan', activeOpacity: 0, description: 'Proclamação da República' },
    [`${year}-11-20`]: { marked: true, dotColor: 'brown', activeOpacity: 0, description: 'Dia Nacional da Consciência Negra' },
    [`${year}-12-25`]: { marked: true, dotColor: 'red', activeOpacity: 0, description: 'Natal' },
  };
};

// Use a função para gerar os feriados globais
const globalHolidays = generateGlobalHolidays(new Date().getFullYear());



  return (
    <View style={styles.container}>
      <Calendar
        // Recolha de datas que têm de ser marcadas
        markedDates={{ ...markedDates, ...globalHolidays }}
        onDayPress={(day) => { setSelectedDate(day.dateString); setModalVisible(true); }}
        onMonthChange={onMonthChange}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text>Adicionar Evento para {formatDate(selectedDate)}</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setEvent(text)}
              value={event}
            />
            <View style={styles.buttonContainer}>
              <Button title="Adicionar Evento" onPress={() => addEvent(selectedDate)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Remover Evento" onPress={() => removeEvent(selectedDate)} />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
            
      <ScrollView style={styles.eventList}>
        {Object.keys(markedDates).map((date) => (
          <View key={date} style={styles.eventItem}>
            <Text>Data: {date}</Text>
            <Text>Evento: {markedDates[date].event}</Text>
            <Text>Hora: {markedDates[date].timestamp}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.holidayList}>
        <Text style={styles.holidayTitle}>Feriados Globais deste mês:</Text>
        {Object.keys(currentMonthHolidays).map((date) => (
          <View key={date} style={styles.holidayItem}>
            <Text>Data: {formatDateToDisplay(date)}</Text>
            <Text>Descrição: {globalHolidays[date].description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {

    marginTop: '50%',
    width:'100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },

  buttonContainer: {
    marginTop: 5,
  },

  eventList: {
    marginTop: 20,
  },

  eventItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

  holidayList: {
    marginTop: 20,
  },

  holidayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  holidayItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },

});

export default Calendario;