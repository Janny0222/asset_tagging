import Layout from "@/components/Layout";
import { Input, InputCost, InputDate, TextArea } from "@/components/UserInput";
import {  TaggingProps } from "@/lib/definition";
import { getSpecificTagging } from "@/services/Tagging/taggingService";
import { useAssetInventoryStore } from "@/stores/assetInventoryStore";
import { useCategoryStore } from "@/stores/categoryStore";
import { useCompanyStore } from "@/stores/companyStore";
import { useTaggingStore } from "@/stores/taggingStore";
import {  useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useStatusStore } from "@/stores/statusStore";
import { Textarea } from "@material-tailwind/react";
import TaggingComponents from "@/components/Inventory/TaggingComponents";
import Head from "next/head";

const Index = () => {
  return (
    <Layout>
      <Head>
        <title>GPC | Asset Tagging</title>
        <meta name="description" content="Company Asset Tagging" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <TaggingComponents />
    </Layout>
  )
}
export default Index