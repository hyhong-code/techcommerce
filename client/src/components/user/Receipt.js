import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

const Receipt = ({ order }) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        {/* Current Date */}
        <Text style={styles.header} fixed>
          {" "}
          ~ {new Date().toLocaleString()} ~{" "}
        </Text>

        {/* Title */}
        <Text style={styles.title}>Order Receipt</Text>

        {/* Business name */}
        <Text style={styles.author}>Commerce</Text>

        {/* Order Summary */}
        <Text style={styles.subtitle}>Order Summary</Text>

        {/* Products table */}
        <Table data={order.products}>
          {/* Table header */}
          <TableHeader>
            <TableCell>Title</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Quanttity</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Color</TableCell>
          </TableHeader>

          {/* Table body */}
          <TableBody>
            <DataTableCell getContent={(product) => product.product.title} />
            <DataTableCell getContent={(product) => `$${product.product.price}`} />
            <DataTableCell getContent={(product) => product.count} />
            <DataTableCell getContent={(product) => product.product.brand} />
            <DataTableCell getContent={(product) => product.color} />
          </TableBody>
        </Table>

        {/* Other information */}
        <Text style={styles.text}>
          {/* Date */}
          <Text>
            Date: {"              "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {"\n"}

          {/* Order Id */}
          <Text>
            Order Id: {"         "}
            {order.paymentIntent.id}
          </Text>
          {"\n"}

          {/* Order Status */}
          <Text>
            Order Status: {"  "}
            {order.orderStatus}
          </Text>
          {"\n"}

          {/* Total Paid */}
          <Text>
            Total Paid: {"       "}${Number(order.paymentIntent.amount) / 100}
          </Text>
        </Text>

        {/* Footer */}
        <Text style={styles.footer}> ~ Thanks for shopping with us ~ </Text>
      </Page>
    </Document>
  );
};

export default Receipt;
