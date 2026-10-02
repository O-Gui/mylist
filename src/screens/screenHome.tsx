import { Feather } from '@expo/vector-icons'; // ícone do botão "+" (ou troque por react-native-vector-icons)
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ClipboardImg from '../../assets/images/Clipboard.png';
import LogoImg from '../../assets/images/mylistlogo.png';

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export function Home() {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const createdCount = tasks.length;
  const doneCount = tasks.filter((t) => t.done).length;

  function handleAddTask() {
    if (!text.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: String(Date.now()), title: text.trim(), done: false },
    ]);
    setText('');
  }

  function handleToggleTask(id: string) {
  setTasks((prev) =>
    prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
  );
}

  function renderEmpty() {
    return (
      <View style={styles.emptyContainer}>
      <Image source={ClipboardImg} style={styles.emptyImage} resizeMode="contain" />
        <Text style={styles.emptyTitle}>Sua lista ainda está vazia</Text>
        <Text style={styles.emptySubtitle}>Adicione algo para se organizar</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.header} />

      <View style={styles.container}>
        {/* Cabeçalho com a logo */}
        <View style={styles.header}>
          <Image source={LogoImg} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Conteúdo */}
        <View style={styles.content}>
          {/* Input + botão (sobrepõe a divisão entre header e body) */}
          <View style={styles.form}>
            <TextInput
              style={[styles.input, isFocused && styles.inputFocused]}
              placeholder="Adicione algo a sua lista"
              placeholderTextColor={COLORS.placeholder}
              value={text}
              onChangeText={setText}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onSubmitEditing={handleAddTask}
              returnKeyType="done"
            />
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.7}
              onPress={handleAddTask}
            >
              <Feather name="plus-circle" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>

          {/* Contadores */}
          <View style={styles.counters}>
            <View style={styles.counterItem}>
              <Text style={[styles.counterLabel, { color: COLORS.created }]}>
                Criadas
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{createdCount}</Text>
              </View>
            </View>

            <View style={styles.counterItem}>
              <Text style={[styles.counterLabel, { color: COLORS.done }]}>
                Concluídas
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{doneCount}</Text>
              </View>
            </View>
          </View>

          {/* Lista */}
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}

            renderItem={({ item }) => (
  <View style={styles.taskCard}>
    <TouchableOpacity
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      onPress={() => handleToggleTask(item.id)}
    >
      {item.done ? (
        <View style={styles.checkChecked}>
          <Feather name="check" size={12} color={COLORS.white} />
        </View>
      ) : (
        <View style={styles.checkUnchecked} />
      )}
    </TouchableOpacity>

    <Text style={[styles.taskText, item.done && styles.taskTextDone]}>
      {item.title}
    </Text>
  </View>
)}
            ListEmptyComponent={renderEmpty}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            style={styles.list}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const COLORS = {
  header: '#1d1d1de1',
  background: '#0A0A0A',
  input: '#262626',
  inputBorder: '#0D0D0D',
  inputFocus: '#1E6F9F',
  button: '#1E6F9F',
  created: '#1ABCBC',
  done: '#0A9FD6',
  badge: '#333333',
  divider: '#333333',
  placeholder: '#808080',
  emptyTitle: '#414141',
  emptySubtitle: '#414141',
  white: '#F2F2F2',
  card: '#1A1A1A',
  cardBorder: '#333333',
  taskDone: '#808080',
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.header,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    height: 160,
    backgroundColor: COLORS.header,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: Platform.OS === 'ios' ? 0 : 8,
  },
  logo: {
    width: 140,
    height: 32,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },

  // Form (sobe 27px para sobrepor o header)
  form: {
    flexDirection: 'row',
    marginTop: -27,
  },
  input: {
    flex: 1,
    height: 54,
    backgroundColor: COLORS.input,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 16,
    color: COLORS.white,
    marginRight: 4,
  },
  inputFocused: {
    borderColor: COLORS.inputFocus,
  },
  button: {
    width: 54,
    height: 54,
    borderRadius: 6,
    backgroundColor: COLORS.button,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Contadores
  counters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  counterItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 8,
  },
  badge: {
    minWidth: 25,
    height: 19,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: COLORS.badge,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.white,
  },

  // Lista
  list: {
    flex: 1,
  },
listContent: {
  flexGrow: 1,
  paddingTop: 12,
  paddingBottom: 24,
},

  // Estado vazio
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 56,
    height: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.emptyTitle,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.emptySubtitle,
    textAlign: 'center',
  },

  // Item da lista
taskCard: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: COLORS.card,
  borderWidth: 1,
  borderColor: COLORS.cardBorder,
  borderRadius: 8,
  padding: 12,
  marginBottom: 8,
},
checkUnchecked: {
  width: 18,
  height: 18,
  borderRadius: 9,
  borderWidth: 2,
  borderColor: COLORS.created,
},
checkChecked: {
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: COLORS.done,
  alignItems: 'center',
  justifyContent: 'center',
},
taskText: {
  flex: 1,
  marginLeft: 12,
  fontSize: 14,
  lineHeight: 20,
  color: COLORS.white,
},
taskTextDone: {
  color: COLORS.taskDone,
  textDecorationLine: 'line-through',
},

});