import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
  },
  text: {
    color: '#c9d1d9',
  },
});

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d1117',
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gridContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  daysColumn: {
    marginRight: 10,
  },
  dayText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: 20,
    height: 20,
    margin: 1,
  },
  filledCell: {
    backgroundColor: 'green',
  },
  emptyCell: {
    backgroundColor: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
  icons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 10,
  },
});

