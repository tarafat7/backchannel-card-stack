import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import type { Experience, UserProfile, BusinessCard } from '@/types';

// Profile functions
export async function getProfile() {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) throw error;
    return profile;
  } catch (error: any) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
}

export async function updateProfile(updates: Partial<UserProfile>) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('User not authenticated');

    // Update profile table
    if (updates.card?.name || updates.card?.title || updates.card?.company) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          name: updates.card?.name,
          title: updates.card?.title,
          company: updates.card?.company,
          phone_number: updates.card?.phoneNumber,
          avatar_url: updates.card?.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (profileError) throw profileError;
    }

    return true;
  } catch (error: any) {
    console.error('Error updating profile:', error.message);
    toast({
      title: 'Error updating profile',
      description: error.message,
      variant: 'destructive'
    });
    return false;
  }
}

// Experience functions
export async function getExperiences() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error: any) {
    console.error('Error fetching experiences:', error.message);
    return [];
  }
}

export async function updateExperiences(experiences: Experience[]) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('User not authenticated');

    // First delete existing experiences
    const { error: deleteError } = await supabase
      .from('experiences')
      .delete()
      .eq('profile_id', userId);

    if (deleteError) throw deleteError;

    // Then insert new ones
    if (experiences.length > 0) {
      const { error: insertError } = await supabase
        .from('experiences')
        .insert(experiences.map(exp => ({
          profile_id: userId,
          title: exp.title,
          company: exp.company,
          years: exp.years,
          description: exp.description
        })));

      if (insertError) throw insertError;
    }

    return true;
  } catch (error: any) {
    console.error('Error updating experiences:', error.message);
    toast({
      title: 'Error updating experiences',
      description: error.message,
      variant: 'destructive'
    });
    return false;
  }
}

// Expertise areas functions
export async function getExpertiseAreas() {
  try {
    const { data, error } = await supabase
      .from('expertise_areas')
      .select('name');

    if (error) throw error;
    return data.map(item => item.name) || [];
  } catch (error: any) {
    console.error('Error fetching expertise areas:', error.message);
    return [];
  }
}

export async function updateExpertiseAreas(areas: string[]) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('User not authenticated');

    // First delete existing areas
    const { error: deleteError } = await supabase
      .from('expertise_areas')
      .delete()
      .eq('profile_id', userId);

    if (deleteError) throw deleteError;

    // Then insert new ones
    if (areas.length > 0) {
      const { error: insertError } = await supabase
        .from('expertise_areas')
        .insert(areas.map(name => ({
          profile_id: userId,
          name
        })));

      if (insertError) throw insertError;
    }

    return true;
  } catch (error: any) {
    console.error('Error updating expertise areas:', error.message);
    toast({
      title: 'Error updating expertise areas',
      description: error.message,
      variant: 'destructive'
    });
    return false;
  }
}

// Business card functions
export async function getBusinessCard() {
  try {
    const { data: card, error: cardError } = await supabase
      .from('business_cards')
      .select('*')
      .single();

    if (cardError && cardError.code !== 'PGRST116') throw cardError;

    if (card) {
      // Get links for this card
      const { data: links, error: linksError } = await supabase
        .from('links')
        .select('*')
        .eq('card_id', card.id);

      if (linksError) throw linksError;

      // Get profile info
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('name, title, company, avatar_url, phone_number')
        .eq('id', card.profile_id)
        .single();

      if (profileError) throw profileError;

      // Get expertise areas
      const { data: expertiseAreas, error: expertiseError } = await supabase
        .from('expertise_areas')
        .select('name')
        .eq('profile_id', card.profile_id);

      if (expertiseError) throw expertiseError;

      return {
        id: card.id,
        name: profile.name,
        title: profile.title,
        company: profile.company,
        avatar: profile.avatar_url,
        phoneNumber: profile.phone_number,
        status: card.status,
        expertiseAreas: expertiseAreas.map(area => area.name),
        links: links.map(link => ({ type: link.type, url: link.url })),
        design: {
          backgroundStyle: card.background_style,
          textColor: card.text_color
        },
        connectionDegree: 1,
        mutualConnections: []
      };
    }
    
    return null;
  } catch (error: any) {
    console.error('Error fetching business card:', error.message);
    return null;
  }
}

export async function updateBusinessCard(card: BusinessCard) {
  try {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) throw new Error('User not authenticated');

    // First, check if a card already exists
    const { data: existingCard, error: fetchError } = await supabase
      .from('business_cards')
      .select('id')
      .eq('profile_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    // Update profile information
    await updateProfile({ card });

    // Update or create business card
    if (existingCard) {
      const { error: updateError } = await supabase
        .from('business_cards')
        .update({
          status: card.status,
          background_style: card.design.backgroundStyle,
          text_color: card.design.textColor,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingCard.id);

      if (updateError) throw updateError;

      // Handle links - first delete existing links
      const { error: deleteLinksError } = await supabase
        .from('links')
        .delete()
        .eq('card_id', existingCard.id);

      if (deleteLinksError) throw deleteLinksError;

      // Then insert new links
      if (card.links && card.links.length > 0) {
        const { error: insertLinksError } = await supabase
          .from('links')
          .insert(card.links.filter(link => link.type && link.url).map(link => ({
            card_id: existingCard.id,
            type: link.type,
            url: link.url
          })));

        if (insertLinksError) throw insertLinksError;
      }
    } else {
      // Create new business card
      const { data: newCard, error: createError } = await supabase
        .from('business_cards')
        .insert({
          profile_id: userId,
          status: card.status || '',
          background_style: card.design.backgroundStyle,
          text_color: card.design.textColor
        })
        .select('id')
        .single();

      if (createError) throw createError;

      // Insert links for new card
      if (card.links && card.links.length > 0 && newCard) {
        const { error: insertLinksError } = await supabase
          .from('links')
          .insert(card.links.filter(link => link.type && link.url).map(link => ({
            card_id: newCard.id,
            type: link.type,
            url: link.url
          })));

        if (insertLinksError) throw insertLinksError;
      }
    }

    // Update expertise areas
    if (card.expertiseAreas) {
      await updateExpertiseAreas(card.expertiseAreas);
    }

    return true;
  } catch (error: any) {
    console.error('Error updating business card:', error.message);
    toast({
      title: 'Error updating business card',
      description: error.message,
      variant: 'destructive'
    });
    return false;
  }
}
