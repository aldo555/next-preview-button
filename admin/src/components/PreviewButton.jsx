import React, {useEffect, useState} from 'react'
import { Button, Typography } from '@strapi/design-system'
import { Pencil, Globe } from '@strapi/icons'
import { unstable_useContentManagerContext as useContentManagerContext } from '@strapi/strapi/admin'
import { useFetchClient } from '@strapi/admin/strapi-admin'
import {PLUGIN_ID} from "../pluginId"

export const PreviewButton = ({ document }) => {
  const {
    model,
    form,
    hasDraftAndPublish,
  } = useContentManagerContext()
  const { values } = form

  const { get } = useFetchClient()
  const [contentType, setContentType] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContentType = async () => {
      try {
        const response = await get(`/${PLUGIN_ID}/get-content-type?model=${model}`)
        setContentType(response.data)
      } catch (err) {
        console.error('Error fetching preview content type:', err)
        setError('Failed to load preview content type. Please check the plugin configuration.')
      } finally {
        setLoading(false)
      }
    }

    fetchContentType()
  }, [get])

  const handleDraftClick = () => {
    if (loading) return

    if (error) {
      console.warn('Can\'t get draft URL due to config load error:', error)
      return
    }

    window.open(getDraftUrl(), '_blank')
  }

  const handleLiveClick = () => {
    if (loading) return

    if (error) {
      console.warn('Can\'t get draft URL due to config load error:', error)
      return
    }

    window.open(getLiveUrl(), '_blank')
  }

  const getDraftUrl = () => {
    if (contentType.slug) {
      return replaceSlug(contentType.draftUrl)
    }

    return contentType.draftUrl
  }

  const getLiveUrl = () => {
    if (contentType.slug) {
      return replaceSlug(contentType.publishedUrl)
    }

    return contentType.publishedUrl
  }

  const replaceSlug = (url) => {
    return url.replace(':slug', values[contentType.slug] || '')
  }

  if (!contentType || !document || !hasDraftAndPublish) {
    return null
  }

  return {
    title: 'Preview',
    content: (
      <>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<Pencil />}

          onClick={handleDraftClick}
        >
          View Draft
        </Button>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<Globe />}
          onClick={handleLiveClick}
        >
          View Live
        </Button>
      </>
    ),
  }
}
