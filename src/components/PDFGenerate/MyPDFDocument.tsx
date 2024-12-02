import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";


const styles = StyleSheet.create({
    page: {
      
      
      padding: 2,
    },
    section: {
      flex: 'row',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      margin: 1,
      padding: 1,
      fontSize: 12,
    },
    title: {
      fontSize: 16,
      marginBottom: 1,
    },
  });

export const MyPDFDocument = ({ equipmentName, serialNumber, tag }: any) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Asset Tagging</Text>
        <View style={styles.section}>
          <Text>Equipment: {equipmentName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Serial Number: {serialNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text>Tag: {tag}</Text>
        </View>
      </Page>
    </Document>
  );