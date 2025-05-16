import { useCompanyStore } from '@/stores/companyStore';
import { create } from 'zustand'
import { TaggingProps } from '@/lib/definition'
import { getTaggingByCategory, getTagging, getSpecificTagging, getTaggingSuggestions } from '@/services/Tagging/taggingService'
import { useCategoryStore } from './categoryStore'

interface TaggingState {
    taggingData: TaggingProps[]
    selectedTagging: TaggingProps | null
    suggestions: TaggingProps[]
    setTagingData: (tableData: TaggingProps[]) => void
    setSelectedTagging: (table: TaggingProps) => void
    taggingRefresh: () => void
    taggingComputerRefresh: () => void
    fetchAllTaggingData: (table_id: number, asset_type: any) => void
    fetchSpecificTaggingDatas: (tagging: string) => void
    fetchTaggingSuggestions: (query: string) => void 
    // fetchSpecificTaggingData: (id: string) => void
}
export const useTaggingStore = create<TaggingState>((set, get) => ({
    taggingData: [],
    selectedTagging: null,
    suggestions: [],
    setTagingData: (taggingData: TaggingProps[]) => set({ taggingData }),
    setSelectedTagging: (table: TaggingProps) => set({ selectedTagging: table }),
    setSuggestions: (suggestions: TaggingProps[]) => set({ suggestions }),
    taggingRefresh: () => get().fetchAllTaggingData(0, 0),
    taggingComputerRefresh: () => get().fetchAllTaggingData(0, 0),
    fetchAllTaggingData: async (table_id: number, asset_type: number) => {
        try {
            const allTagging = await getTaggingByCategory(table_id, asset_type)
            set({ taggingData: allTagging })
        } catch (error) {
            console.error('Error fetching Companies', error)
        }
    },
    fetchSpecificTaggingDatas: async (tagging: string) => {
        
        try {
            const allTaggingByCategory = await getSpecificTagging(tagging)
            set({ selectedTagging: allTaggingByCategory })
        } catch (error) {
            console.error('Error fetching Companies', error)
        }
    },
    fetchTaggingSuggestions: async (query: string) => {
        try {
            const suggestions = await getTaggingSuggestions(query)
            set({ suggestions: suggestions }) // Set suggestions based on the input
        } catch (error) {
            console.error('Error fetching suggestions', error)
        }
    }
}))